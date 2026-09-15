import { NextResponse } from "next/server";

import connectDB from "@/../lib/mongodb";
import User from "@/../models/User";

import { getUserFromToken } from "@/../lib/auth";

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromToken();

    if (!user || (user.role !== "superadmin" && user.role !== "admin")) {
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

    const { id } = await params;

    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // Prevent an admin from deleting themselves
    if (userToDelete._id.toString() === user.userId.toString()) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot delete your own account",
        },
        {
          status: 400,
        },
      );
    }

    // Only superadmin can delete another admin or superadmin
    if (
      (userToDelete.role === "admin" || userToDelete.role === "superadmin") &&
      user.role !== "superadmin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to delete this user",
        },
        {
          status: 403,
        },
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      {
        status: 500,
      },
    );
  }
}
