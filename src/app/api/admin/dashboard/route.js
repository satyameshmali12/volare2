import { NextResponse } from "next/server";
import connectDB from "@/../lib/mongodb";
import User from "@/../models/User";
import Message from "@/../models/Message";
import { getUserFromToken } from "@/../lib/auth";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 },
      );
    }

    const [totalUsers, totalMessages] = await Promise.all([
      User.countDocuments({
        role: { $in: ["sponsor", "member"] },
      }),
      Message.countDocuments(),
    ]);

    return NextResponse.json(
      {
        success: true,
        totalUsers,
        totalMessages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Dashboard fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard data",
      },
      { status: 500 },
    );
  }
}
