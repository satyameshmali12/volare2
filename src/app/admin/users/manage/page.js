"use client";

import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchUsers() {
    try {
      setLoading(true);

      const response = await fetch("/api/users", {
        cache: "no-store",
      });

      const data = await response.json();
      console.log("data:", data);
      console.log(response.ok, data.success);
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load users");
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);
      alert(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(user._id);

      const response = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser._id !== user._id),
      );
    } catch (error) {
      console.error("Delete user error:", error);

      alert(error.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            Manage Users
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage users registered in the Volare portal.
          </p>
        </div>

        {users.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-bold text-gray-900">No users found</p>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no users to manage.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_180px_100px] border-b border-gray-100 bg-gray-50 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 sm:grid">
              <span>User</span>
              <span>Role</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-gray-100">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="grid gap-4 px-6 py-5 sm:grid-cols-[1fr_180px_100px] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate font-bold text-gray-900">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`
                        inline-flex rounded-full px-3 py-1.5
                        text-xs font-bold capitalize
                        ${
                          user.role === "superadmin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : user.role === "sponsor"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {user.role}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(user)}
                      disabled={deletingId === user._id}
                      className="
                        rounded-full
                        bg-red-50
                        px-4 py-2
                        text-xs font-bold
                        text-red-600
                        transition
                        hover:bg-red-600
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {deletingId === user._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
