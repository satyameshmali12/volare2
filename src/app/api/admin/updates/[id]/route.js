import { NextResponse } from "next/server";

import connectDB from "@/../lib/mongodb";
import Update from "@/../models/Update";
import User from "@/../models/User";

import { getUserFromToken } from "@/../lib/auth";

export async function PATCH(req, { params }) {
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

    const { id } = await params;
    const body = await req.json();

    const {
      title,
      image,
      googleDriveLink,
      description,
      visibility,
      sponsors,
      dateTime,
      location,
      category,
      amountSpent,
      currency,
      resourceUsed,
      tags,
      published,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Description is required",
        },
        {
          status: 400,
        },
      );
    }

    const allowedVisibility = [
      "public",
      "members_sponsors",
      "specific_sponsors",
    ];

    if (!allowedVisibility.includes(visibility)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid visibility",
        },
        {
          status: 400,
        },
      );
    }

    let recipientUsers = [];

    if (visibility === "specific_sponsors") {
      if (!Array.isArray(sponsors) || sponsors.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Select at least one sponsor",
          },
          {
            status: 400,
          },
        );
      }

      recipientUsers = await User.find({
        _id: { $in: sponsors },
        role: "sponsor",
      }).select("_id");

      if (recipientUsers.length !== sponsors.length) {
        return NextResponse.json(
          {
            success: false,
            message: "One or more selected sponsors are invalid",
          },
          {
            status: 400,
          },
        );
      }
    }

    const update = await Update.findById(id);

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

    update.title = title.trim();
    update.image = image?.trim() || undefined;
    update.googleDriveLink = googleDriveLink?.trim() || undefined;
    update.description = description.trim();
    update.visibility = visibility;

    update.sponsors =
      visibility === "specific_sponsors"
        ? recipientUsers.map((recipient) => recipient._id)
        : [];

    update.dateTime = dateTime || undefined;
    update.location = location?.trim() || undefined;
    update.category = category || "general";

    update.amountSpent =
      amountSpent !== undefined && amountSpent !== "" ? Number(amountSpent) : 0;

    update.currency = currency || "INR";
    update.resourceUsed = resourceUsed?.trim() || undefined;

    update.tags = Array.isArray(tags) ? tags : [];

    if (published !== undefined) {
      update.published = Boolean(published);
    }

    await update.save();

    const updatedUpdate = await Update.findById(id)
      .populate("createdBy", "name email")
      .populate("sponsors", "name email")
      .lean();

    return NextResponse.json({
      success: true,
      message: "Update modified successfully",
      update: updatedUpdate,
    });
  } catch (error) {
    console.error("Modify update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to modify update",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req, { params }) {
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

    const { id } = await params;

    const update = await Update.findById(id);

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

    await Update.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Update deleted successfully",
    });
  } catch (error) {
    console.error("Delete update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete update",
      },
      {
        status: 500,
      },
    );
  }
}
