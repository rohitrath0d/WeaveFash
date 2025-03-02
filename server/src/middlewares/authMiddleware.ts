// why we have to create authMiddleware.ts file?
// Bcoz it is important to check if the user is normal user/SUPER_ADMIN

import { NextFunction, Request, Response } from "express";
// import { Response } from "express";
import {jwtVerify, JWTPayload} from 'jose';

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

    jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET)).then((res)=>{
        const payload = res.payload as JWTPayload & {
            userId: string;
            email: string;
            role: string;
        }
        // adding current user to the request object
        req.user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        }
        next()
    }).catch((e) => {
        console.error(e);
        res.status(401).json({ success: false, error: "Access token is invalid or not found" });
        
    })
}

export const isSuperAdmin =  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(req.user && req.user.role === 'SUPER_ADMIN'){
        next()
    } else {
        res.status(401).json({ success: false, error: "Access denied! Super Admin access required"
        });
      
    }
}