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

  const isProtected = matchers.some(({ matcher }) => matcher(req));

  // 🔒 Not signed in → protect routes
  if (!userId && isProtected) {
    return auth().redirectToSignIn();
  }

  // ⚠️ If logged in but role missing → allow (prevent crash)
  if (userId && !role) {
    return NextResponse.next();
  }

  // 🔁 Redirect "/" to dashboard safely
  if (userId && role && pathname === "/") {
    return NextResponse.redirect(new URL(`/${role}`, req.nextUrl.origin));
  }

  // 🔐 Role-based restriction
  if (userId && role) {
    for (const { matcher, allowedRoles } of matchers) {
      if (matcher(req) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/${role}`, req.nextUrl.origin));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
