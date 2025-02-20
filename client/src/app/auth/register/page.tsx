'use client'

import Image from "next/image";
import banner from '../../../../public/images/banner2.jpg' 
import logo from '../../../../public/images/logo1.png'
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { protectSignUpAction } from "@/actions/auth";
import { title } from "process";

function RegisterPage() {
    const [formData, setFormData] = useState ({
        name: '',
        email: '',
        password: ''
    });

    const { toast } =useToast();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData(prev => ({
           ...prev, 
           [event.target.name] : event.target.value 
        }))
    }
    console.log(formData);
    
    // now, to check the authentication/validation of the sign-up & sign-in forms (actions/auth.ts).
    // hence before clicking on the submit button, we have to check whether the defined rules/validation are functioning properly or not.
    const handleSubmit = async(event: React.FormEvent) =>{
        event.preventDefault()
        const checkFirstLevelOfValidation = await protectSignUpAction(formData.email)
        if(!checkFirstLevelOfValidation.success){
            toast({
                title: checkFirstLevelOfValidation.error,       // this.error
                variant: 'destructive'
            })
            // don't forget to return it, if didn't do, then we cant go to the next one.
            return
        }
    }   

    return <div className="min-h-screen bg-[#fff6f4] flex">
        <div className="hidden lg:block w-1/2 bg-[#ffede1] relative overflow-hidden">
        <Image
        src={banner}
        alt="Register"
        fill
        style={{objectFit: 'cover', objectPosition: 'center'}}
        priority
/>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center">
        <div className="max-w-md w-full mx-auto">
            <div className="flex justify-center">
                <Image
                 src={logo}
                 width={200}
                 height={50}
                 alt="Logo"
                />
            </div>
           <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="name"> Full Name</Label>
                <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="bg-[#ffede1]"
                value={formData.name}
                onChange={handleOnChange}
                />
            </div>
            
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                required
                className="bg-[#ffede1]"
                value={formData.email}
                onChange={handleOnChange}
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="password"> Password</Label>
                <Input
                id="password"
                name="password"
                type="text"
                placeholder="Enter your password "
                required
                className="bg-[#ffede1]"
                value={formData.password}
                onChange={handleOnChange}
                />
            </div>

            <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black transition-colors"
            > CREATE ACCOUNT
            </Button>
            <p className="text-center text-[#3f3d56] text-sm">
                Already have an account {" "}
                <Link href={  '/auth/login'} 
                className="text-[#000] hover:underline font-bold"> Sign in </Link>
            </p>
            </form>  

        </div>
        </div>
    </div>
}
export default RegisterPage;