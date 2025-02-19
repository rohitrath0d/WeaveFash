import { error } from "console"
import { prisma } from "../server"
import {Request, Response} from 'express'
import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken'

// create a helper function, which will help to generate token.
function generateToken(userId: string, email: string, role: string){
    const accessToken = jwt.sign({
        userId, email, role
    })
}

export const register = async (req:Request, res:Response) : Promise<void> => {
    try {
        const {name, email, password} = req.body
        const existingUser = await prisma.user.findUnique({where: {email}})
        if(existingUser){
            res.status(400).json({
                success : false, 
                error: 'User with this email exists!'
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data:{
                name, email, password : hashedPassword, role: 'USER'
            }
        })
        res.status(201).json({
            message : 'User registered successfully',
            success : true,
            userId : user.id,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Registration failed'})
    }
}
export const login = async(req:Request, res:Response):Promise<void> =>{
     try {
        const {email, password} = req.body
        const extractCurrentUSer =  await prisma.user.findUnique({where:{email}})

        if(!extractCurrentUSer || !(await bcrypt.compare(password, extractCurrentUSer.password))){
            res.status(401).json({
                success: false, 
                error: 'Invalid credentials'
            });
            return;
        }
        
     } catch (error) {
        console.log(error);
        res.status(500).json({error: "Login failed"});
     }
}