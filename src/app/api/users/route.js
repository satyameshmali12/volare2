import { NextResponse } from "next/server";

import connectDB from "@/../lib/mongodb";
import User from "@/../models/User";

import { getUserFromToken } from "@/../lib/auth";

export async function GET() {
  try {
    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        },
      );
    }

    await connectDB();

    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load users",
      },
      {
        status: 500,
      },
    );
  }
}
