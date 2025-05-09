import { connectDb } from "@/lib/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/lib/db/models/order";
import { cookies } from "next/headers";

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

        const orders = await Order.find()
            .populate("orderItems.product")
            .sort({ createdAt: -1 });

        return NextResponse.json(
            { message: "Orders fetched successfully", orders },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const order = await Order.create({
            user: body.userId,
            orderItems: body.orderItems,
            totalPrice: body.totalAmount,
            status: "pending",
            shippingAddress: `${body.address}, ${body.city}, ${body.postalCode}`,
            customerInfo: {
                name: body.name,
                email: body.email,
                phone: body.phone
            },
            notes: body.notes
        });

        return NextResponse.json(
            { message: "Order created successfully", order },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
} 