import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});
    const url = request.nextUrl;

    if(token && 
        (
            url.pathname.startsWith('/auth/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/dashboard') &&
            url.pathname !== '/dashboard'
        )
    ){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if(!token && 
        (
            url.pathname.startsWith('/dashboard')
        )
    ){
        return NextResponse.redirect(new URL('/signup', request.url)); 
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/signin', '/signup', '/verify/:path*', '/dashboard/:path'],
}