"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMessages: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");

        const data = await response.json();

        console.log("Dashboard data:", data);

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load dashboard data");
        }

        setStats({
          totalUsers: data.totalUsers,
          totalMessages: data.totalMessages,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2 text-gray-500">Manage your Team Volare website.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL USERS */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading ? "..." : stats.totalUsers}
          </h2>
        </div>

        {/* MESSAGES */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Messages</p>

          <h2 className="mt-2 text-3xl font-bold">
            {loading ? "..." : stats.totalMessages}
          </h2>
        </div>

        {/* DATABASE */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Database</p>

          <h2 className="mt-3 text-lg font-semibold text-green-600">
            Connected
          </h2>
        </div>

        {/* ACCESS */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Access</p>

          <h2 className="mt-3 text-lg font-semibold">Super Admin</h2>
        </div>
      </div>
    </div>
  );
}
