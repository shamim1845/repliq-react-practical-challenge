import { connectDb } from "@/lib/db/connectDB";
import { User } from "@/lib/db/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDb();

        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify the token
        const payload = await verifyAuth(req);

        // Get user from database
        const user = await User.findById(payload.jti).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User found", user },
            { status: 200 }
        );
    } catch (error: any) {
        if (error.message === "Your token has expired.") {
            return NextResponse.json(
                { message: "Token expired" },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
} 