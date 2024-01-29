import { getToken } from "@/lib/auth";
import { connectDb } from "@/lib/db/connectDB";
import { User } from "@/lib/db/models/user";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

  const token = await getToken();

  cookies().set("token", token);

  return Response.json(
    {
      message: "Login successfull.",
      token,
      user,
    },
    { status: 200 }
  );
}
