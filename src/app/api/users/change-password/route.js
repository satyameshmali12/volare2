import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { getUserFromToken } from "../../../../../lib/auth";

/* 
This is to send the info to the user who is loggedin
*/
export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get user error:", error);

    return NextResponse.json(
      { message: "Failed to get user information" },
      { status: 500 },
    );
  }
}

/*
it facilitates the user to change it's password and also it set's the password must be changed to false
*/
export async function POST(request) {
  try {
    await connectDB();

    const user = await getUserFromToken();
    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    const dbUser = await User.findById(user.userId);

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      dbUser.password,
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 },
      );
    }

    const samePassword = await bcrypt.compare(newPassword, dbUser.password);

    if (samePassword) {
      return NextResponse.json(
        {
          message: "New password must be different from the current password",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    dbUser.password = hashedPassword;
    dbUser.mustChangePassword = false;

    await dbUser.save();

    return NextResponse.json(
      {
        message: "Password changed successfully",
        user: {
          id: dbUser._id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
          mustChangePassword: false,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Change password error:", error);

    return NextResponse.json(
      { message: "Failed to change password" },
      { status: 500 },
    );
  }
}
