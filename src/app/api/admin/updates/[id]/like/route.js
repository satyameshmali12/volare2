import { NextResponse } from "next/server";

import connectDB from "@/../lib/mongodb";
import Update from "@/../models/Update";
import { getUserFromToken } from "@/../lib/auth";

export async function POST(req, { params }) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to like an update",
        },
        {
          status: 401,
        },
      );
    }

    await connectDB();

    const { id } = await params;

    const update = await Update.findOne({
      _id: id,
      published: true,
    });

    if (!update) {
      return NextResponse.json(
        {
          success: false,
          message: "Update not found",
        },
        {
          status: 404,
        },
      );
    }

    const userId = user.userId.toString();

    const alreadyLiked = update.likes.some(
      (like) => like.toString() === userId,
    );

    if (alreadyLiked) {
      update.likes = update.likes.filter((like) => like.toString() !== userId);
    } else {
      update.likes.push(user.userId);
    }

    await update.save();

    return NextResponse.json({
      success: true,
      liked: !alreadyLiked,
      likeCount: update.likes.length,
    });
  } catch (error) {
    console.error("Like update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update like",
      },
      {
        status: 500,
      },
    );
  }
}
