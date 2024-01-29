import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export const config = {
  matcher: "/dashboard(.*)",
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message);
  });

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else {
    return NextResponse.next();
  }
}
