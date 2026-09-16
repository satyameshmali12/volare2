import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/../lib/mongodb";
import User from "@/../models/User";
import { getUserFromToken } from "../../../../lib/auth";

// GET /api/users

/*
this is for the super admin to get all the users
*/
export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const users = await User.find({
      role: { $in: ["sponsor", "member"] },
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch users error:", error);

    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

/*
this is for the super admin to create the user from the admin panel
user can be either member or sponsor
*/
export async function POST(request) {
  try {
    await connectDB();

    // Check logged-in user
    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { name, email, password, role } = await request.json();

    // Validate fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Only superadmin can create these two types
    if (!["sponsor", "member"].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role. Only sponsor or member can be created." },
        { status: 400 },
      );
    }

    // Basic password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Hash initial password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      mustChangePassword: true,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          mustChangePassword: newUser.mustChangePassword,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create user error:", error);

    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }
}
