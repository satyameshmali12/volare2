import { NextResponse } from "next/server";
import { getUserFromToken } from "@/../lib/auth";
import connectDB from "@/../lib/mongodb";
import Message from "@/../models/Message";

export async function PATCH(req) {
  try {
    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No messages selected" },
        { status: 400 },
      );
    }

    await connectDB();

    await Message.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $set: { read: true },
      },
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to mark messages as read" },
      { status: 500 },
    );
  }
}
