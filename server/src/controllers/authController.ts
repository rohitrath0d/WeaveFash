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
    process.env.JWT_SECRET_BACKEND!,
    { expiresIn: "60m" }
  );

  const refreshToken = uuidv4();        // this will create a unique ID
  return { accessToken, refreshToken };
}

async function setTokens(res: Response, accessToken: string, refreshToken: string) {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
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

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// login method
export const login = async (req: Request, res: Response): Promise<void> => {

  try {
    const { email, password } = req.body;

    // whenever, we login, we also need to check if the user is already present or not. If not, then register first.
    const extractCurrentUSer = await prisma.user.findUnique({
      where: { email },
    });

    if (!extractCurrentUSer || !(await bcrypt.compare(password, extractCurrentUSer.password))){
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });

      return;
    }

    // create our access and refreshToken
    const {accessToken, refreshToken} = generateToken(
      extractCurrentUSer.id,
      extractCurrentUSer.email,
      extractCurrentUSer.role
    );

    // set our tokens
    await setTokens(res, accessToken, refreshToken)
    res.status(200).json({
        success: true,
        message: 'Login successful',
        user:{
            id: extractCurrentUSer.id,
            name: extractCurrentUSer.name,
            email: extractCurrentUSer.email,
            role: extractCurrentUSer.role,
        }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> =>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        res.status(401).json({
            success: false,
            error: 'Invalid refresh token'
        })
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                refreshToken: refreshToken
            }
        })

        // if user is not found..1
        if(!user){
            res.status(401).json({
                success: false,
                error: 'User not found'
            })
            return
        }
        // after previous step, we again have to generate accessToken & refreshToken
        const {accessToken, refreshToken: newRefreshToken } =  generateToken(user.id, user.email, user.role)
        // set our tokens
        await setTokens(res, accessToken, newRefreshToken);
        res.status(200).json({
            success: true, 
            message: 'Refresh token refreshed successfully '
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Refresh token error"})
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
} 
