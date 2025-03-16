import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		// Redirect unauthenticated users to /login with a callback URL
		if (!req.nextauth.token) {
			const url = req.nextUrl.clone();
			url.pathname = "/login";
			url.searchParams.set("callbackUrl", req.nextUrl.pathname);
			return NextResponse.redirect(url);
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token, // Ensure the user is authenticated
		},
	}
);

export const config = {
	matcher: ["/fnfg", "/today", "/profile"],
};
