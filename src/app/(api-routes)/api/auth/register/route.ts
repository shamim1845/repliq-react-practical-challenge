import { connectDb } from "@/lib/db/connectDB";
import { User } from "@/lib/db/models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  connectDb();

  const { name, phone, password } = await req.json();

  if (!name || !phone || !password) {
    return Response.json(
      {
        message: "Name, Phone number, and Password is required.",
      },
      {
        status: 400,
      }
    );
  }

  let userExist;
  try {
    userExist = await User.findOne({ phone: phone });
  } catch (error) {
    console.log(error);
  }

  if (userExist) {
    return Response.json({
      message: "User already exist with this phone number.",
    });
  }

  let user = null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, phone, password: hashedPassword });
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return Response.json({
      message: "Account not created.",
      user,
    });
  }

  return Response.json(
    {
      message: "Account created successfully.",
      user,
    },
    { status: 201 }
  );
}
