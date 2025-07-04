'use client'

import Image from "next/image";
// import banner from '../../../../public/images/banner2.jpg'
import model from '../../../../public/images/model2.jpg'
// import logo from '../../../../public/images/logo1.png'
// import shoplogo from '../../../../public/images/shoplogo.png'
import logo from "../../../../public/images/logo.png"

import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { protectSignInAction } from "@/actions/auth";

function LoginPage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { toast } = useToast();
    const { login, isLoading } = useAuthStore();
    const router = useRouter();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }; 

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const checkFirstLevelOfValidation = await protectSignInAction(formData.email);
        if (!checkFirstLevelOfValidation.success) {
            toast({
                title: checkFirstLevelOfValidation.error,       // this.error
                variant: 'destructive'
            });
            // don't forget to return it, if didn't do, then we cant go to the next one.
            return;
        }

        //success --> is for login. hence in login userId will be not here, but in registration it will be there.
        const success = await login(formData.email, formData.password);
        if (success) {
            toast({
                title: "Login Successfull!",
            });
            // in login, we have set the user (user: response.data.user)
            const user = useAuthStore.getState().user   //here, we will get the user
            if (user?.role === 'SUPER_ADMIN') router.push('/super-admin')
            // else router.push('/home-page')
            else router.push('/')

        }
    };

    return <div className="min-h-screen bg-[#fff6f4] flex">
        <div className="hidden lg:block w-1/2 bg-[#ffede1] relative overflow-hidden">
            <Image
                src={model}
                alt="Register"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
            />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center">
                    <Image
                        src={logo}
                        width={400}
                        height={200}
                        alt="Logo"
                    />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* <div className="space-y-1">
                <Label htmlFor="name"> Full Name</Label>
                <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name" 
                required
                className="bg-[#ffede1]"
                />
            </div> */}

                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            className="bg-[#ffede1]"
                            required
                            value={formData.email}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password"> Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password "
                            className="bg-[#ffede1]"
                            required
                            value={formData.password}
                            onChange={handleOnChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-black transition-colors"
                    > LOGIN
                    </Button>
                    <p className="text-center text-[#3f3d56] text-sm">
                        New here? {" "}
                        <Link href={'/auth/register'}
                            className="text-[#000] hover:underline font-bold">
                            Sign up </Link>
                    </p>
                </form>

            </div>
        </div>
    </div>
}
export default LoginPage;
