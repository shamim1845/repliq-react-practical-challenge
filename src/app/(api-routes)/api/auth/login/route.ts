import { getToken } from "@/lib/auth";
import { connectDb } from "@/lib/db/connectDB";
import { User } from "@/lib/db/models/user";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import mongoose from "mongoose";

export async function POST(req: Request, res: NextResponse) {
  connectDb();

  const { phone, password } = await req.json();

  if (!phone || !password) {
    return Response.json(
      {
        message: "Phone number, and Password is required.",
      },
      {
        status: 400,
      }
    );
  }

  let user;
  try {
    user = await User.findOne({ phone: phone });
  } catch (error) {
    console.log(error);
  }

  console.log(user);

  if (!user) {
    return NextResponse.json(
      {
        message: "User not exist with this phone number.",
      },
      {
        status: 404,
      }
    );
  }

  const passwordVerified = await bcrypt.compare(password, user.password);
  if (!passwordVerified) {
    return Response.json({
      message: "Wrong password.",
    });
  }

  // Ensure user._id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(user._id)) {
    return NextResponse.json(
      {
        message: "Invalid user ID format.",
      },
      {
        status: 500,
      }
    );
  }

  // Create token with user ID
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(user._id.toString()) // Use actual user ID
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECREAT));

  cookies().set("token", token);

  return Response.json(
    {
      message: "Login successfull.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone
      }
    },
    { status: 200 }
  );
}
