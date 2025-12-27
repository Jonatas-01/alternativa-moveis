import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/dashboard']

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth/login', '/auth/register']

// Public auth routes (no redirect logic)
const publicAuthRoutes = ['/auth/forgot-password', '/auth/reset-password']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check for auth cookie (Supabase stores session in cookies)
    const supabaseAuth = request.cookies.get('sb-access-token')?.value ||
        request.cookies.getAll().some(cookie =>
            cookie.name.includes('supabase') && cookie.name.includes('auth')
        )

    // Check if trying to access protected routes
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        // For now, we'll handle auth check on the client side
        // since Supabase auth tokens are handled client-side
        return NextResponse.next()
    }

    // Check if trying to access auth routes while logged in
    if (authRoutes.some(route => pathname.startsWith(route))) {
        // Let client-side handle the redirect
        return NextResponse.next()
    }

    // Allow public auth routes (forgot-password, reset-password)
    if (publicAuthRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
    }

    // Add security headers to all responses
    const response = NextResponse.next()

    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
}