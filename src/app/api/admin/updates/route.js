import { NextResponse } from "next/server";

import connectDB from "@/../lib/mongodb";
import Update from "@/../models/Update";
import User from "@/../models/User";

import { getUserFromToken } from "@/../lib/auth";

export async function POST(req) {
  try {
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

    await connectDB();

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

    // -----------------------------------------
    // BASIC VALIDATION
    // -----------------------------------------

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 },
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Description is required",
        },
        { status: 400 },
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
        { status: 400 },
      );
    }

    // -----------------------------------------
    // GET SELECTED SPONSORS
    // -----------------------------------------

    let recipientUsers = [];

    if (visibility === "specific_sponsors") {
      if (!Array.isArray(sponsors) || sponsors.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Select at least one sponsor",
          },
          { status: 400 },
        );
      }

      recipientUsers = await User.find({
        _id: { $in: sponsors },
        role: "sponsor",
      }).select("_id name email");

      if (recipientUsers.length !== sponsors.length) {
        return NextResponse.json(
          {
            success: false,
            message: "One or more selected sponsors are invalid",
          },
          { status: 400 },
        );
      }
    }

    // -----------------------------------------
    // CREATE UPDATE
    // -----------------------------------------

    console.log("user:", user);

    const update = await Update.create({
      title: title.trim(),

      image: image?.trim() || undefined,

      googleDriveLink: googleDriveLink?.trim() || undefined,

      description: description.trim(),

      visibility,

      // This controls who can see the update
      // inside the Volare portal.
      sponsors:
        visibility === "specific_sponsors"
          ? recipientUsers.map((recipient) => recipient._id)
          : [],

      dateTime: dateTime || undefined,

      location: location?.trim() || undefined,

      category: category || "general",

      amountSpent:
        amountSpent !== undefined && amountSpent !== ""
          ? Number(amountSpent)
          : 0,

      currency: currency || "INR",

      resourceUsed: resourceUsed?.trim() || undefined,

      tags: Array.isArray(tags) ? tags : [],

      published: published !== undefined ? Boolean(published) : true,

      createdBy: user.userId,
    });

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Update created successfully",
        update,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create update",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    let user = null;

    try {
      user = await getUserFromToken();
    } catch {
      user = null;
    }

    let updates = [];

    if (!user) {
      updates = await Update.find({
        published: true,
        visibility: "public",
      })
        .populate("createdBy", "name")
        .sort({ dateTime: -1, createdAt: -1 })
        .lean();
    } else if (user.role === "superadmin") {
      updates = await Update.find({
        published: true,
      })
        .populate("createdBy", "name")
        .sort({ dateTime: -1, createdAt: -1 })
        .lean();
    } else if (user.role === "member") {
      updates = await Update.find({
        published: true,
        visibility: {
          $in: ["public", "members_sponsors"],
        },
      })
        .populate("createdBy", "name")
        .sort({ dateTime: -1, createdAt: -1 })
        .lean();
    } else if (user.role === "sponsor") {
      updates = await Update.find({
        published: true,
        $or: [
          {
            visibility: "public",
          },
          {
            visibility: "members_sponsors",
          },
          {
            visibility: "specific_sponsors",
            sponsors: user.userId,
          },
        ],
      })
        .populate("createdBy", "name")
        .sort({ dateTime: -1, createdAt: -1 })
        .lean();
    } else {
      updates = await Update.find({
        published: true,
        visibility: "public",
      })
        .populate("createdBy", "name")
        .sort({ dateTime: -1, createdAt: -1 })
        .lean();
    }

    const currentUserId = user?.userId?.toString();

    const formattedUpdates = updates.map((update) => {
      const likes = Array.isArray(update.likes) ? update.likes : [];

      return {
        ...update,

        likeCount: likes.length,

        likedByMe: currentUserId
          ? likes.some((like) => like.toString() === currentUserId)
          : false,

        // Don't expose the complete list of users who liked it.
        likes: undefined,
      };
    });

    let availableTabs = ["public"];

    if (user?.role === "member") {
      availableTabs = ["public", "members_sponsors"];
    }

    if (user?.role === "sponsor" || user?.role === "superadmin") {
      availableTabs = ["public", "members_sponsors", "specific_sponsors"];
    }

    return NextResponse.json({
      success: true,
      updates: formattedUpdates,
      userType: user?.role || "public",
      availableTabs,
    });
  } catch (error) {
    console.error("Get updates error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load updates",
      },
      {
        status: 500,
      },
    );
  }
}
