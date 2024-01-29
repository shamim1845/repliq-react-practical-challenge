import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your Name."],
    },
    phone: {
      type: String,
      required: [true, "Please Enter your phone number."],
    },
    password: {
      type: String,
      required: [true, "Please Enter a strong password."],
      minlength: [8, "Password must be atleast 8 charecters."],
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models["User"] || mongoose.model("User", userSchema);
