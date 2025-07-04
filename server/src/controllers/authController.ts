import { error } from "console";
import { prisma } from "../server";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { set } from "lodash";

// create a helper function, which will help to generate token.
function generateToken(userId: string, email: string, role: string) {
  const accessToken = jwt.sign(
    {
      userId,
      email,
      role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "60m" }
  );

  const refreshToken = uuidv4();        // this will create a unique ID
  return { accessToken, refreshToken };
}

async function setTokens(res: Response, accessToken: string, refreshToken: string) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    secure: true,
    sameSite: 'none',

    // Without path: '/'	                               With path: '/'
    // Cookie may be scoped to /api/auth only	           Cookie works across entire backend
    // Auth might break silently on other routes	       Works everywhere ✅
    path: '/',
    maxAge: 60 * 60 * 1000,     // 1 hour
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    secure: true,
    sameSite: "none",     // Required for cross-site (Vercel → Render)
    path: '/',
    // maxAge: 7 * 24 * 60 * 60,   // ⛔ WRONG: This is in seconds, but `maxAge` needs milliseconds
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // checking whether the user is a existing user or not.
    const existingUser = await prisma.user.findUnique({ where: { email } });

    // checking if user is already present or not 
    if (existingUser) {
      res.status(400).json({
        success: false,
        error: "User with this email already exists!",
      });

      return;
    }
    //encrypting password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      userId: user.id,      // This will give a unique ID
    });
    return;

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
    return;
  }
};

// login method
export const login = async (req: Request, res: Response): Promise<void> => {
// export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    // whenever, we login, we also need to check if the user is already present or not. If not, then register first.
    const extractCurrentUSer = await prisma.user.findUnique({
      where: { email },
    });

    if (!extractCurrentUSer || !(await bcrypt.compare(password, extractCurrentUSer.password))) {
      // return res.status(401).json({
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
      return;
    }

    // create our access and refreshToken
    const { accessToken, refreshToken } = generateToken(
      extractCurrentUSer.id,
      extractCurrentUSer.email,
      extractCurrentUSer.role
    );

    // Move await prisma.user.update() before setting tokens. Just for cleaner logic (avoid any unexpected async race or crash if DB update fails).
    await prisma.user.update({
      where: { id: extractCurrentUSer.id },
      data: { refreshToken },
    });

    // set our tokens
    await setTokens(res, accessToken, refreshToken)

    // await prisma.user.update({
    //   where: { id: extractCurrentUSer.id },
    //   data: { refreshToken },
    // });

    // return res.status(200).json({
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: extractCurrentUSer.id,
        name: extractCurrentUSer.name,
        email: extractCurrentUSer.email,
        role: extractCurrentUSer.role,
      }
    })
    return;
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ error: "Login failed" });
    res.status(500).json({ error: "Login failed" });
    return;
  }
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> =>{
// export const refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    })
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken
      }
    })

    // if user is not found..1
    if (!user) {
      // return res.status(401).json({
      res.status(401).json({
        success: false,
        error: 'User not found'
      })
      return;
    }
    // after previous step, we again have to generate accessToken & refreshToken
    const { accessToken, refreshToken: newRefreshToken } = generateToken(user.id, user.email, user.role)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });


    // set our tokens
    await setTokens(res, accessToken, newRefreshToken);

    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { refreshToken: newRefreshToken },
    // });

    // return res.status(200).json({
    res.status(200).json({
      success: true,
      message: 'Refresh token refreshed successfully '
    })
    return;
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Refresh token error" })
    res.status(500).json({ error: "Refresh token error" }) 
    return;
  }
}

// logout function
export const logout = async (req: Request, res: Response): Promise<void> => {
  // create our access & refresh token from cookie, and then on the frontend side, we're going to redirect that user to the login page
  // because the authentication is mainly dependent on the token, if its present or not.
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.json({
    success: true,
    message: 'User Logged out successfully',
  });
  return;
} 
