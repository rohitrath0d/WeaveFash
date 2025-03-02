// we have to create middleware, coz of the reason -> even after successfull login, the user can access login page again by typing '/login' in the search bar.

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Basically, we need to keep track of 3 things:-
// -->1. Public routes -> anyone can access
// -->2. User-related routes
// -->3. Client-side routes
// -->4. Super-admin routes  

const publicRoutes = ['/auth/register', '/auth/login'];
const superAdminRoutes = ['/super-admin', 'super-admin/:path*'];
const userRoutes = ['/home-page'];


export async function middleware(request: NextRequest) {
    //first, we need to get the access of accessToken
    // we'll get accessToken from cookies.
    const accessToken = request.cookies.get('accessToken')?.value;
    // also, we need to get the pathname
    const { pathname } = request.nextUrl;

    if (accessToken) {
        // here, we need to verify the token, and check if the role is: user or super-admin
        try {
            const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET));
            const { role } = payload as {
                role: string
            }

            if (publicRoutes.includes(pathname)) {
                return NextResponse.redirect(new URL(role === 'SUPER_ADMIN' ? '/super-admin' : '/home-page', request.url));            // why? bcoz token is already token, meaning user is already logged in. So, if user is logged in, then they can't access the publicRoutes. hence, redirecting users 
            }

            // now, if the user is a super-admin, and they try to access any user-routes
            // e.g. super-admin, cant access checkout page and user cart page.
            if (role === 'SUPER_ADMIN' && userRoutes.some((route) => pathname.startsWith(route))) {
                return NextResponse.redirect(new URL('/super-admin', request.url))
            }

            if (role !== 'SUPER_ADMIN' && superAdminRoutes.some((route) => pathname.startsWith(route))) {
                return NextResponse.redirect(new URL('/home-page', request.url));
            }

            return NextResponse.next();
        } catch (e) {
            console.error('Token verification failed', e);

            const refreshResponse = await fetch('http://localhost:3000/api/auth/refresh-token', {
                method: "POST",
                credentials: "include",
            }
            );

            if (refreshResponse.ok) {
                const response = NextResponse.next()
                response.cookies.set('accessToken', refreshResponse.headers.get('Set-cookie') || "");
                return response;
            } else{
                // ur refresh-token is also failed here
                const response = NextResponse.redirect(new URL('/auth/login', request.url));

                // we need to delete the accessToken/refreshToken (the existing token, here)
                response.cookies.delete('accessToken')
                response.cookies.delete('refreshToken')
                return response;            
            }
        }

    }

    if(!publicRoutes.includes(pathname)){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next(); 
}

// exporting config
export const config = {
    matcher: ["/((?!api|_next/static|_next/image/favicon.ico).*)"],
};