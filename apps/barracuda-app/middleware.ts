import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const privatePaths = ["/dashboard*", "/create-organization"];

const isPrivate = (path: string) => {
	return privatePaths.find((x) =>
		path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
	);
};

const isCreateOrg = (path: string) => {
	return path === "/create-organization";
};

export default withClerkMiddleware((request: NextRequest) => {
	const path = request.nextUrl.pathname;

	if (isPrivate(path)) {
		// if the user is not signed in redirect them to the sign in page.
		const { userId, orgId } = getAuth(request);

		if (!userId) {
			// redirect the users to /pages/sign-in/[[...index]].ts

			const signInUrl = new URL("/sign-in", request.url);
			// signInUrl.searchParams.set("redirect_url", request.url);
			return NextResponse.redirect(signInUrl);
		}

		const ref = request.nextUrl.searchParams.get("ref");

		if (isCreateOrg(path) && ref !== "sign-up" && orgId) {
			const dashboardUrl = new URL("/dashboard", request.url);

			return NextResponse.redirect(dashboardUrl);
		}

		return NextResponse.next();
	}

	return NextResponse.next();
});

export const config = {
	matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
