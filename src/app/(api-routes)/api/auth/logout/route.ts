import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, res: NextResponse) {
  cookies().delete("token");

  return Response.json(
    {
      message: "cookies successfull removed.",
    },
    { status: 200 }
  );
}
