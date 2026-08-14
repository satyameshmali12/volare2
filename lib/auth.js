import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromToken() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    return null;
  }
}

export async function requireSuperAdmin() {
  const user = await getUserFromToken();

  if (!user) {
    return null;
  }

  if (user.role !== "superadmin") {
    return null;
  }

  return user;
}
