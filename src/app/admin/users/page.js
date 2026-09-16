"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "member",
};

export default function UserManagement() {
  const [form, setForm] = useState(initialForm);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/users", {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const res = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess(
        `${form.role === "sponsor" ? "Sponsor" : "Member"} created successfully.`,
      );

      setForm(initialForm);

      await fetchUsers();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            User Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage Volare sponsors and members.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Create User */}
        <div className="mb-10 rounded-2xl border bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create User</h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a sponsor or member with an initial password.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="user@example.com"
                  autoComplete="off"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Initial Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Initial Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                  The user will be required to change this password after their
                  first login.
                </p>
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Account Type
                </label>

                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                >
                  <option value="member">Member</option>
                  <option value="sponsor">Sponsor</option>
                </select>
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-600">
                🔐 The initial password is stored securely using bcrypt. The
                user must create a new password when they log in for the first
                time.
              </p>
            </div>

            {/* Submit */}
            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>

        {/* Users */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Users</h2>

              <p className="mt-1 text-sm text-gray-500">
                Sponsors and members created by the superadmin.
              </p>
            </div>

            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
              {users.length} Users
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
              No users found.
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* User info */}
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-700">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-gray-900">
                        {user.name}
                      </h3>

                      <p className="truncate text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Account info */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Role */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        user.role === "sponsor"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                    {/* Password status */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.mustChangePassword
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.mustChangePassword
                        ? "Password change required"
                        : "Password updated"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
