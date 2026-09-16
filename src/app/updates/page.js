"use client";

import { useEffect, useMemo, useState } from "react";

const TAB_INFO = {
  public: {
    label: "Public",
    description: "Everyone can follow the journey",
  },

  members_sponsors: {
    label: "Team",
    description: "Shared with the Volare community",
  },

  specific_sponsors: {
    label: "Private",
    description: "Shared specifically with you",
  },
};

const CATEGORY_INFO = {
  general: {
    label: "General",
    accent: "from-slate-400 to-slate-600",
    soft: "bg-slate-50",
    text: "text-slate-700",
  },

  project: {
    label: "Project",
    accent: "from-cyan-400 to-blue-600",
    soft: "bg-cyan-50",
    text: "text-cyan-700",
  },

  purchase: {
    label: "Purchase",
    accent: "from-emerald-400 to-teal-600",
    soft: "bg-emerald-50",
    text: "text-emerald-700",
  },

  testing: {
    label: "Testing",
    accent: "from-orange-400 to-amber-600",
    soft: "bg-orange-50",
    text: "text-orange-700",
  },

  competition: {
    label: "Competition",
    accent: "from-violet-400 to-purple-600",
    soft: "bg-violet-50",
    text: "text-violet-700",
  },

  event: {
    label: "Event",
    accent: "from-pink-400 to-rose-600",
    soft: "bg-pink-50",
    text: "text-pink-700",
  },

  achievement: {
    label: "Achievement",
    accent: "from-yellow-400 to-orange-500",
    soft: "bg-yellow-50",
    text: "text-yellow-700",
  },

  milestone: {
    label: "Milestone",
    accent: "from-blue-400 to-indigo-600",
    soft: "bg-blue-50",
    text: "text-blue-700",
  },

  other: {
    label: "Other",
    accent: "from-gray-400 to-gray-600",
    soft: "bg-gray-50",
    text: "text-gray-700",
  },
};

function formatDate(date) {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return null;
  }
}

function formatDateTime(date) {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  } catch {
    return null;
  }
}

function formatAmount(amount, currency = "INR") {
  if (!amount || Number(amount) <= 0) return null;

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function VisibilityBadge({ visibility }) {
  const info = TAB_INFO[visibility];

  return (
    <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur">
      {info?.label || "Update"}
    </span>
  );
}

function LikeButton({ update, onLike, liking }) {
  return (
    <button
      type="button"
      disabled={liking}
      onClick={() => onLike(update._id)}
      className={`group/like inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
        update.likedByMe
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-gray-200 bg-white text-gray-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
      } ${liking ? "cursor-wait opacity-60" : "active:scale-95"}`}
    >
      <span
        className={`text-lg leading-none transition-transform duration-300 ${
          update.likedByMe ? "scale-110" : "group-hover/like:scale-110"
        }`}
      >
        {update.likedByMe ? "♥" : "♡"}
      </span>

      <span>{update.likeCount || 0}</span>

      <span className="hidden sm:inline">
        {update.likedByMe ? "Liked" : "Like"}
      </span>
    </button>
  );
}

function UpdateCard({ update, onLike, liking }) {
  const category = CATEGORY_INFO[update.category] || CATEGORY_INFO.general;

  const date = formatDate(update.dateTime || update.createdAt);

  const dateTime = formatDateTime(update.dateTime);

  const amount = formatAmount(update.amountSpent, update.currency);

  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-gray-200/80 bg-white shadow-[0_10px_45px_rgba(15,23,42,0.06)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
      {/* ACCENT */}

      <div
        className={`absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r ${category.accent}`}
      />

      <div className="grid lg:grid-cols-[290px_1fr]">
        {/* IMAGE */}

        <div className="relative h-64 overflow-hidden bg-gray-100 lg:h-[280px]">
          {update.image ? (
            <>
              <img
                src={update.image}
                alt={update.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </>
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.accent}`}
              />

              {/* 2D DECORATION */}

              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[28px] border-white/10" />

              <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full border-[30px] border-white/10" />

              <div className="absolute left-8 top-1/2 h-px w-40 rotate-[-25deg] bg-white/20" />

              <div className="absolute left-20 top-[42%] h-2.5 w-2.5 rounded-full bg-white/40" />

              <div className="absolute bottom-8 right-10 h-12 w-12 rounded-full border border-white/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black text-white/20">V</span>
              </div>
            </>
          )}

          {/* CATEGORY */}

          <div className="absolute left-5 top-5">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-gray-800 shadow-sm">
              {category.label}
            </span>
          </div>

          {/* VISIBILITY */}

          <div className="absolute right-5 top-5">
            <VisibilityBadge visibility={update.visibility} />
          </div>

          {date && (
            <div className="absolute bottom-5 left-5 text-xs font-semibold text-white">
              {date}
            </div>
          )}
        </div>

        {/* CONTENT */}

        <div className="relative flex min-w-0 flex-col justify-between p-6 sm:p-7">
          {/* SMALL 2D SHAPE */}

          <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 overflow-hidden">
            <div
              className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${category.accent} opacity-[0.07]`}
            />

            <div className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-gray-200" />
          </div>

          <div>
            {/* DATE / LOCATION */}

            <div className="mb-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
              {date && <span>{date}</span>}

              {update.location && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{update.location}</span>
                </>
              )}
            </div>

            {/* TITLE */}

            <h2 className="max-w-3xl text-2xl font-black leading-tight tracking-[-0.025em] text-gray-950 sm:text-[27px]">
              {update.title}
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-6 text-gray-600 sm:text-[15px] sm:leading-7">
              {update.description}
            </p>

            {/* META */}

            <div className="mt-4 flex flex-wrap gap-2">
              {amount && (
                <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  {amount} spent
                </span>
              )}

              {dateTime && (
                <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {dateTime}
                </span>
              )}

              {update.resourceUsed && (
                <span className="rounded-xl bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                  Resources used
                </span>
              )}
            </div>

            {/* TAGS */}

            {Array.isArray(update.tags) && update.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {update.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER */}

          <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              Posted by{" "}
              <span className="font-semibold text-gray-600">
                {update.createdBy?.name || "Volare"}
              </span>
            </p>

            <div className="flex flex-wrap gap-2">
              <LikeButton update={update} onLike={onLike} liking={liking} />

              {update.googleDriveLink && (
                <a
                  href={update.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-gray-800 active:scale-95"
                >
                  Documents
                  <span className="text-sm">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ tab }) {
  const info = TAB_INFO[tab];

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white px-6 py-24 text-center">
      {/* 2D DECORATION */}

      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full border-[35px] border-cyan-100/60" />

      <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border-[40px] border-violet-100/60" />

      <div className="relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-violet-50 text-2xl text-violet-500">
          ✦
        </div>

        <h3 className="mt-6 text-2xl font-black text-gray-950">
          Nothing here yet
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
          {info?.description || "New Volare updates will appear here."}
        </p>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white lg:grid lg:grid-cols-[42%_58%]">
      <div className="h-72 animate-pulse bg-gray-100 lg:h-[430px]" />

      <div className="space-y-5 p-8 lg:p-10">
        <div className="h-3 w-24 animate-pulse rounded-full bg-gray-100" />

        <div className="h-12 w-4/5 animate-pulse rounded-xl bg-gray-100" />

        <div className="h-24 animate-pulse rounded-xl bg-gray-100" />

        <div className="h-10 w-48 animate-pulse rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [availableTabs, setAvailableTabs] = useState(["public"]);

  const [activeTab, setActiveTab] = useState("public");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [likingId, setLikingId] = useState(null);

  async function loadUpdates() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/updates", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load updates");
      }

      setUpdates(data.updates || []);

      const tabs =
        data.availableTabs?.length > 0 ? data.availableTabs : ["public"];

      setAvailableTabs(tabs);

      setActiveTab((current) => (tabs.includes(current) ? current : tabs[0]));
    } catch (error) {
      console.error("Failed to load updates:", error);

      setError(error.message || "Unable to load updates.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUpdates();
  }, []);

  async function handleLike(updateId) {
    try {
      setLikingId(updateId);
      // here the url for like is inside admin. Their is no such relation of doing like to a post by admin.
      const response = await fetch(`/api/admin/updates/${updateId}/like`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.status === 401) {
        alert("Please login to like an update.");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update like");
      }

      setUpdates((currentUpdates) =>
        currentUpdates.map((update) =>
          update._id === updateId
            ? {
                ...update,
                likedByMe: data.liked,
                likeCount: data.likeCount,
              }
            : update,
        ),
      );
    } catch (error) {
      console.error("Like error:", error);

      alert(error.message || "Something went wrong.");
    } finally {
      setLikingId(null);
    }
  }

  const filteredUpdates = useMemo(() => {
    return updates.filter((update) => update.visibility === activeTab);
  }, [updates, activeTab]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7fa]">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        {/* BIG 2D SHAPES */}

        <div className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full border-[70px] border-cyan-100/70" />

        <div className="pointer-events-none absolute right-24 top-24 h-5 w-5 rounded-full bg-cyan-300/50" />

        <div className="pointer-events-none absolute right-40 top-40 h-3 w-3 rounded-full bg-violet-400/40" />

        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[430px] w-[430px] rounded-full border-[70px] border-violet-100/60" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10">
          <div className="max-w-4xl" style={{ marginTop: "20px" }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-cyan-700">
              Team Volare
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              Journey
            </div>

            <h1 className="text-5xl font-black tracking-[-0.055em] text-gray-950 sm:text-7xl lg:text-[82px] lg:leading-[0.95]">
              Follow the
              <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
              Explore the progress, experiments, milestones and achievements
              shaping Team Volare.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-14 lg:px-10">
        {/* TABS */}

        <div className="mb-10">
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-2">
              {availableTabs.map((tab) => {
                const info = TAB_INFO[tab];

                if (!info) return null;

                const active = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-all duration-300 sm:px-7 ${
                      active
                        ? "border-gray-950 bg-gray-950 text-white shadow-lg"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-950"
                    }`}
                  >
                    {active && (
                      <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                    )}

                    <span className="block text-sm font-black">
                      {info.label}
                    </span>

                    <span
                      className={`mt-1 hidden text-[11px] sm:block ${
                        active ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {info.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* HEADER */}

        {!loading && !error && (
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                {TAB_INFO[activeTab]?.label}
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-gray-950 sm:text-4xl">
                Latest from Volare
              </h2>
            </div>

            <div className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 sm:block">
              {filteredUpdates.length}{" "}
              {filteredUpdates.length === 1 ? "post" : "posts"}
            </div>
          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <LoadingCard key={item} />
            ))}
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-[32px] border border-red-100 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-500">
              !
            </div>

            <h3 className="mt-5 text-2xl font-black text-gray-950">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <button
              type="button"
              onClick={loadUpdates}
              className="mt-7 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* POSTS */}

        {!loading && !error && filteredUpdates.length > 0 && (
          <div className="space-y-6">
            {filteredUpdates.map((update) => (
              <UpdateCard
                key={update._id}
                update={update}
                onLike={handleLike}
                liking={likingId === update._id}
              />
            ))}
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && filteredUpdates.length === 0 && (
          <EmptyState tab={activeTab} />
        )}
      </section>
    </main>
  );
}
