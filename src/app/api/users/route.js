import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/../lib/mongodb";
import User from "@/../models/User";

// GET /api/users
export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("email");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// add authentication as only super admin can do this
// POST /api/users   to create the user
export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password, role } = await request.json();
    console.log(name, email, password);
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }
}
