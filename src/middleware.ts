import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path starts with /admin (except for /admin/login)
  const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
  
  // Check if the user is authenticated by checking for a session cookie
  const sessionCookie = request.cookies.get('session');
  const isAuthenticated = !!sessionCookie;

  // If the user is trying to access an admin route but is not authenticated,
  // redirect them to the login page
  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 