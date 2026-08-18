import { NextResponse } from "next/server";
import connectDB from "@/../lib/mongodb";
import TeamMember from "@/../models/TeamMember";

const ALLOWED_VERTICALS = ["mechanical", "electrical", "software"];

// GET /api/team
// GET /api/team?vertical=software

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const vertical = searchParams.get("vertical");

    // If vertical is supplied, validate it
    if (vertical && !ALLOWED_VERTICALS.includes(vertical.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid vertical",
        },
        { status: 400 },
      );
    }

    const query = {
      active: true,
    };

    if (vertical) {
      query.vertical = vertical.toLowerCase();
    }

    const members = await TeamMember.find(query)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    console.error("GET TEAM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team members",
      },
      { status: 500 },
    );
  }
}

// POST /api/team

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      role,
      vertical,
      image,
      bio,
      linkedin,
      github,
      order,
      active,
    } = body;

    // Required fields
    if (!name || !role || !vertical) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, role and vertical are required",
        },
        { status: 400 },
      );
    }

    const normalizedVertical = vertical.toLowerCase().trim();

    // Check vertical
    if (!ALLOWED_VERTICALS.includes(normalizedVertical)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid vertical. Use mechanical, electrical or software",
        },
        { status: 400 },
      );
    }

    console.log("hello world");
    console.log(
      name,
      role,
      vertical,
      image,
      bio,
      linkedin,
      github,
      order,
      active,
    );
    const member = await TeamMember.create({
      name: name.trim(),
      role: role.trim(),
      vertical: normalizedVertical,
      image: image || "",
      bio: bio || "",
      linkedin: linkedin || "",
      github: github || "",
      order: order || 0,
      active: active !== undefined ? active : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Team member created successfully",
        member,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE TEAM MEMBER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create team member",
      },
      { status: 500 },
    );
  }
}
