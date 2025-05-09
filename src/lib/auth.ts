import type { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error { }

const secret = process.env.JWT_SECREAT as string;

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

/**
 * Gets the token from cookies
 */
export async function getToken() {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(secret));

  return token;
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set("token", "", { httpOnly: true, maxAge: 0 });
  return res;
}
