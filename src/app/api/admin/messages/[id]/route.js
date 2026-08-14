import { NextResponse } from "next/server";
import { getUserFromToken } from "@/../lib/auth";
import connectDB from "@/../lib/mongodb";
import Message from "@/../models/Message";

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    await connectDB();

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete message" },
      { status: 500 },
    );
  }
}
