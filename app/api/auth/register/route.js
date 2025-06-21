import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, email, password, phone, role, isActive } = await req.json();

    if (!username || !email || !password || !phone || !role || typeof isActive === "undefined") {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = uuidv4();

    // Create user
    const user = await User.create({
      userID,
      username,
      email,
      password: hashedPassword,
      phone,
      role,
      isActive: isActive === "true" // convert string to boolean
    });

    return NextResponse.json({
      success: true,
      message: "User registered and created successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}