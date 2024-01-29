import { User } from "@/lib/db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request, res: Response) {
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

  const user = await User.findOne({ phone: phone });

  if (!user) {
    return Response.json(
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

  const secret = process.env.JWT_SECREAT as string;
  const token = jwt.sign({ data: user }, secret, { expiresIn: "1h" });

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
