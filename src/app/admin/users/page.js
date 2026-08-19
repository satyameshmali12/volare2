"use client";

import { useEffect, useState } from "react";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const initialForm = {
  name: "",
  role: "",
  vertical: "",
  image: "",
  bio: "",
  linkedin: "",
  github: "",
  order: 0,
  active: true,
};

export default function TeamManagement() {
  const [form, setForm] = useState(initialForm);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch all team members
  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/api/team`, {
        method: "GET",
        cache: "no-store",
      });
      console.log("hello world");
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch members");
      }

      setMembers(Array.isArray(data) ? data : data.members || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new member
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const payload = {
        ...form,
        order: Number(form.order),
      };

      const res = await fetch(`${BASE_URL}/api/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add member");
      }

      setSuccess("Team member added successfully.");

      setForm(initialForm);

      // Refresh the members list
      await fetchMembers();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Open confirmation dialog
  const askDelete = (member) => {
    setMemberToDelete(member);
    setDeleteOpen(true);
  };

  // Delete member
  const handleDelete = async () => {
    if (!memberToDelete?._id) return;

    try {
      setDeleting(true);
      setError("");

      const res = await fetch(`${BASE_URL}/api/team?id=${memberToDelete._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete member");
      }

      setMembers((prev) =>
        prev.filter((member) => member._id !== memberToDelete._id),
      );

      setDeleteOpen(false);
      setMemberToDelete(null);
      setSuccess("Team member deleted successfully.");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Team Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add, view and manage team members.
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

        {/* Add Member Form */}
        <div className="mb-10 rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Add Team Member
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter member name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Team Lead"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Vertical */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Vertical
                </label>

                <select
                  name="vertical"
                  value={form.vertical}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                >
                  <option value="">Select vertical</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="electrical">Electrical</option>
                  <option value="software">Software</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Display Order
                </label>

                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  GitHub
                </label>

                <input
                  type="url"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short bio..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* Active */}
              <div className="md:col-span-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="active"
                    checked={form.active}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Active member
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Member"}
              </button>
            </div>
          </form>
        </div>

        {/* Members */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Team Members
            </h2>

            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
              {members.length} Members
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
              Loading members...
            </div>
          ) : members.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
              No team members found.
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                >
                  {/* Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                        {member.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          member.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {member.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {member.role}
                    </p>

                    {member.vertical && (
                      <p className="mt-1 text-xs capitalize text-gray-500">
                        {member.vertical}
                      </p>
                    )}

                    {member.bio && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {member.bio}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}

                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:underline"
                        >
                          GitHub
                        </a>
                      )}

                      <span className="text-gray-400">
                        Order: {member.order}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <div className="shrink-0">
                    <button
                      onClick={() => askDelete(member)}
                      className="w-full rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Your existing confirmation component */}
      <DeleteConfirmation
        open={deleteOpen}
        onCancel={() => {
          if (!deleting) {
            setDeleteOpen(false);
            setMemberToDelete(null);
          }
        }}
        onConfirm={handleDelete}
      />

      {/* Prevent accidental interaction while deleting */}
      {deleting && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/20">
          <div className="rounded-xl bg-white px-6 py-4 text-sm font-medium shadow-xl">
            Deleting member...
          </div>
        </div>
      )}
    </div>
  );
}
