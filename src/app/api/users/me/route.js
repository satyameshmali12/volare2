import { NextResponse } from "next/server";
import connectDB from "@/../lib/mongodb";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/../lib/auth";

export async function GET() {
  try {
    await connectDB();

    // Get cookies
    const cookieStore = await cookies();

    // Get authentication token
    const token = cookieStore.get("token")?.value;

    // No token = not logged in
    if (!token) {
      return NextResponse.json(
        {
          loggedIn: false,
          user: null,
        },
        { status: 401 },
      );
    }

    // Verify token
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json(
        {
          loggedIn: false,
          user: null,
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        loggedIn: true,
        userType: user.role,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get current user error:", error);

    return NextResponse.json(
      {
        loggedIn: false,
      },
      { status: 401 },
    );
  }
}
