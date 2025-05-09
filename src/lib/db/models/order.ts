import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered'],
            default: 'pending'
        },
        shippingAddress: {
            type: String,
            required: true
        },
        customerInfo: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        },
        notes: {
            type: String
        }
    },
    { timestamps: true }
);

export const Order = mongoose.models["Order"] || mongoose.model("Order", orderSchema);

