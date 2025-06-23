// why we have to create authMiddleware.ts file?
// Bcoz it is important to check if the user is normal user/SUPER_ADMIN

import { NextFunction, Request, Response } from "express";
// import { Response } from "express";
import {jwtVerify, JWTPayload} from 'jose';
import { verify } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {         // Request is imported from express
    user?: {
        userId: string; 
        email: string;
        role: string;
    };
}

// we have to authenticate JWT
export const authenticateJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // create the accesstoken first, from cookies, YES!
    const accessToken =  req.cookies.accessToken;

    if (!accessToken) {
        res.status(401).json({ success: false, error: "Access token is invalid or not found " });
        return;
    }

    jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET_BACKEND)).then((res)=>{
        const payload = res.payload as JWTPayload & {
            userId: string;
            email: string;
            role: string;
        };
        // adding current user to the request object
        req.user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        };
        next();
    }).catch((e) => {
        console.error(e);
        res.status(401).json({ success: false, error: "Access token is invalid or not found" });
        
    })
};

export const isSuperAdmin =  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(req.user && req.user.role === 'SUPER_ADMIN'){
        next()
    } else {
        res.status(401).json({ success: false, error: "Access denied! Super Admin access required"
        });
      
    }
};


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
      }
  
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'Token missing' });
      }
  
      const decoded = verify(token, process.env.JWT_SECRET_BACKEND!);
      (req as any).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
