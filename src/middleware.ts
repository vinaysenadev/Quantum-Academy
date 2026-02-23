import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.entries(routeAccessMap).map(([route, roles]) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: roles,
}));

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();
  const pathname = req.nextUrl.pathname;
  const role = sessionClaims?.role as string | undefined;

  // 🔒 If not logged in → block protected routes
  const isProtected = matchers.some(({ matcher }) => matcher(req));

  if (!userId && isProtected) {
    return auth().redirectToSignIn();
  }

  // 🔁 Redirect root "/" to role dashboard
  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  // 🔐 Role restriction
  if (userId && role) {
    for (const { matcher, allowedRoles } of matchers) {
      if (matcher(req) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
