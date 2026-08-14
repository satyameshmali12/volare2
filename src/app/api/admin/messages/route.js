import { NextResponse } from "next/server";
import { getUserFromToken } from "@/../lib/auth";
import connectDB from "@/../lib/mongodb";
import Message from "@/../models/Message";

export async function GET() {
  try {
    const user = await getUserFromToken();

    if (!user || user.role !== "superadmin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await connectDB();

    const messages = await Message.find()
      .sort({ read: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    console.log("hello world");
    const body = await req.json();

    const { name, email, description } = body;
    console.log(name, email, description);

    // Validate input
    if (!name || !email || !description) {
      return NextResponse.json(
        {
          message: "Name, email and message are required",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const newMessage = await Message.create({
      name,
      email,
      description,
      read: false,
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: newMessage,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Message API error:", error);

    return NextResponse.json(
      {
        message: "Failed to send message",
      },
      { status: 500 },
    );
  }
}
