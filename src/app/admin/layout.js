import { redirect } from "next/navigation";
import { requireSuperAdmin } from "@/../lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }) {
  const user = await requireSuperAdmin();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <AdminSidebar />

      <main className="min-h-screen ml-16">{children}</main>
    </div>
  );
}
