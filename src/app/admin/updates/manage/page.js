"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CATEGORY_INFO = {
  general: {
    label: "General",
    accent: "from-gray-700 to-gray-950",
  },
  engineering: {
    label: "Engineering",
    accent: "from-blue-500 to-cyan-500",
  },
  competition: {
    label: "Competition",
    accent: "from-orange-500 to-red-500",
  },
  finance: {
    label: "Finance",
    accent: "from-emerald-500 to-green-600",
  },
  milestone: {
    label: "Milestone",
    accent: "from-violet-500 to-purple-600",
  },
};

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getVisibilityLabel(visibility) {
  if (visibility === "public") {
    return "Public";
  }

  if (visibility === "members_sponsors") {
    return "Team + Sponsors";
  }

  if (visibility === "specific_sponsors") {
    return "Selected Sponsors";
  }

  return visibility;
}

export default function ManageUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchUpdates() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/updates", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load updates");
      }

      setUpdates(data.updates || []);
    } catch (error) {
      console.error("Fetch updates error:", error);

      alert(error.message || "Failed to load updates");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUpdates();
  }, []);

  async function handleDelete(update) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${update.title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(update._id);

      const response = await fetch(`/api/admin/updates/${update._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete update");
      }

      setUpdates((currentUpdates) =>
        currentUpdates.filter(
          (currentUpdate) => currentUpdate._id !== update._id,
        ),
      );
    } catch (error) {
      console.error("Delete update error:", error);

      alert(error.message || "Failed to delete update");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-3xl bg-gray-200"
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
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Manage Updates
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Modify, publish, or remove project updates.
            </p>
          </div>

          <Link
            href="/admin/updates/new"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-gray-950
              px-5 py-3
              text-sm font-bold
              text-white
              transition
              hover:bg-gray-800
              active:scale-[0.98]
            "
          >
            + Create Update
          </Link>
        </div>

        {/* Empty state */}
        {updates.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
              +
            </div>

            <h2 className="mt-5 text-lg font-bold text-gray-900">
              No updates yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Create your first project update to see it here.
            </p>

            <Link
              href="/admin/updates/create"
              className="mt-6 inline-flex rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Create Update
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {updates.map((update) => {
              const category =
                CATEGORY_INFO[update.category] || CATEGORY_INFO.general;

              return (
                <article
                  key={update._id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-[0_8px_35px_rgba(15,23,42,0.05)]
                    transition
                    hover:shadow-[0_15px_45px_rgba(15,23,42,0.08)]
                  "
                >
                  {/* Accent */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${category.accent}`}
                  />

                  <div className="grid lg:grid-cols-[230px_1fr]">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-gray-100 lg:h-full lg:min-h-[210px]">
                      {update.image ? (
                        <>
                          <img
                            src={update.image}
                            alt={update.title}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </>
                      ) : (
                        <>
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${category.accent}`}
                          />

                          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border-[22px] border-white/10" />

                          <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border-[24px] border-white/10" />

                          <span className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/15">
                            V
                          </span>
                        </>
                      )}

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-gray-800 shadow-sm">
                        {category.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex min-w-0 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`
                              rounded-full
                              px-3 py-1
                              text-[10px]
                              font-bold
                              ${
                                update.published
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }
                            `}
                          >
                            {update.published ? "Published" : "Draft"}
                          </span>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500">
                            {getVisibilityLabel(update.visibility)}
                          </span>
                        </div>

                        <h2 className="mt-3 text-xl font-black tracking-tight text-gray-950 sm:text-2xl">
                          {update.title}
                        </h2>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                          {update.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-400">
                          {update.dateTime && (
                            <span>{formatDate(update.dateTime)}</span>
                          )}

                          {update.location && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-gray-300" />
                              <span>{update.location}</span>
                            </>
                          )}

                          {update.createdBy?.name && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-gray-300" />
                              <span>By {update.createdBy.name}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <div className="text-xs text-gray-400">
                          {update.tags?.length
                            ? `${update.tags.length} tag${
                                update.tags.length === 1 ? "" : "s"
                              }`
                            : "No tags"}
                        </div>

                        <div className="flex items-center gap-2">
                          {update.googleDriveLink && (
                            <a
                              href={update.googleDriveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                rounded-full
                                bg-gray-100
                                px-4 py-2.5
                                text-xs font-bold
                                text-gray-700
                                transition
                                hover:bg-gray-200
                              "
                            >
                              Documents ↗
                            </a>
                          )}

                          <Link
                            href={`/admin/updates/edit/${update._id}`}
                            className="
                              rounded-full
                              bg-blue-50
                              px-4 py-2.5
                              text-xs font-bold
                              text-blue-600
                              transition
                              hover:bg-blue-600
                              hover:text-white
                            "
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(update)}
                            disabled={deletingId === update._id}
                            className="
                              rounded-full
                              bg-red-50
                              px-4 py-2.5
                              text-xs font-bold
                              text-red-600
                              transition
                              hover:bg-red-600
                              hover:text-white
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            {deletingId === update._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
