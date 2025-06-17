import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl; // The current URL object
    console.log("Check ===========================>")
    // Define public paths that don't require authentication
    const publicPaths = [
        '/sign-in', // Corrected from /sign-ini
        '/sign-up',
        '/verify',
        '/', // Assuming the root path is public (e.g., a marketing site)
         // Assuming this is also public
    ];

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some(path => url.pathname === path || url.pathname.startsWith(`${path}/`));

    // --- Rule 1: Redirect authenticated users from auth pages ---
    // If user has a token AND is trying to access a sign-in/sign-up/verify page
    if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') || url.pathname.startsWith('/verify'))) {
        // Redirect them to the dashboard or a default authenticated home page
        return NextResponse.redirect(new URL('/dashboard', request.url)); // Or '/pages/landingPage' if that's the home
    }

    // --- Rule 2: Protect private/dashboard routes ---
    // If user does NOT have a token AND is trying to access a protected page (like dashboard)
    // AND the current path is NOT a public path (to avoid redirecting public paths to login)
    if (!token && !isPublicPath) {
        // Redirect them to the sign-in page
        // You might want to add a query parameter to redirect back after login
        const callbackUrl = encodeURIComponent(url.pathname + url.search);
        return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url));
    }

    // --- Rule 3: Allow the request to proceed ---
    // If none of the above conditions are met, allow the request to proceed.
    // This happens if:
    // - User has no token and is on a public path.
    // - User has a token and is on a protected path (they can access it).
    return NextResponse.next();
}

export const config = {
    // matcher should include all paths that need to be checked by the middleware.
    // It's good practice to include all paths you want to protect or redirect from.
    matcher: [
        '/pages/upload',
        '/verify',
        '/', // Include root if it's part of the flow you want to control
        '/dashboard/:path*', // All paths under /dashboard
         // If you want to redirect authenticated users from here
    ]
};