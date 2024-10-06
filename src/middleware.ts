
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('userToken');
    const protectedRoutes = ['/payments'];
    const loginRoute = '/'; 

   
    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/', request.url)); 
    }

   
    if (request.nextUrl.pathname === loginRoute && token) {
        return NextResponse.redirect(new URL('/payments', request.url)); 
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/payments/:path*', '/'], 
};

