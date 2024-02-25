import { NextRequest, NextResponse } from "next/server";
import { verifyJWTToken } from './lib/auth';
const allowedRoutes = ['/login', '/register', '/api/auth/login', '/api/auth/register'];

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const cookies = request.cookies;
    const token = cookies.get('token')?.value;
    if (allowedRoutes.includes(url.pathname)) {
        return NextResponse.next();
    }
    if (!token) {
        return NextResponse.redirect(url.origin + '/login');
    }
    try {
        await verifyJWTToken(token);
        return NextResponse.next(); 
    } catch (e) {
        return NextResponse.redirect(url.origin + '/login');
    }
}
export const config = {
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };