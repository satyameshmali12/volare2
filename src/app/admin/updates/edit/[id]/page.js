"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const categories = [
  { value: "general", label: "General" },
  { value: "engineering", label: "Engineering" },
  { value: "competition", label: "Competition" },
  { value: "finance", label: "Finance" },
  { value: "milestone", label: "Milestone" },
];

const visibilityOptions = [
  {
    value: "public",
    label: "Public",
    description: "Visible to everyone",
  },
  {
    value: "members_sponsors",
    label: "Team + Sponsors",
    description: "Visible to logged-in members and sponsors",
  },
  {
    value: "specific_sponsors",
    label: "Selected Sponsors",
    description: "Visible only to selected sponsors",
  },
];

export default function EditUpdate() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [sponsors, setSponsors] = useState([]);
  const [loadingSponsors, setLoadingSponsors] = useState(false);

  const [form, setForm] = useState({
    title: "",
    image: "",
    googleDriveLink: "",
    description: "",
    visibility: "public",
    sponsors: [],
    dateTime: "",
    location: "",
    category: "general",
    amountSpent: "",
    currency: "INR",
    resourceUsed: "",
    tags: "",
    published: true,
  });

  useEffect(() => {
    if (params?.id) {
      fetchUpdate();
    }
  }, [params?.id]);

  useEffect(() => {
    if (form.visibility === "specific_sponsors") {
      fetchSponsors();
    }
  }, [form.visibility]);

  async function fetchUpdate() {
    try {
      setLoading(true);

      const response = await fetch(`/api/admin/updates/${params.id}`, {
        cache: "no-store",
      });

      /*
       * Your current API only has PATCH and DELETE.
       * Therefore we cannot GET a single update from that route.
       *
       * We use the existing admin GET endpoint and find the
       * required update from the returned list.
       */
      const data = await fetch("/api/admin/updates", {
        cache: "no-store",
      }).then((res) => res.json());

      if (!data.success) {
        throw new Error(data.message || "Failed to load updates");
      }

      const update = data.updates?.find((item) => item._id === params.id);

      if (!update) {
        throw new Error("Update not found");
      }

      setForm({
        title: update.title || "",
        image: update.image || "",
        googleDriveLink: update.googleDriveLink || "",
        description: update.description || "",
        visibility: update.visibility || "public",
        sponsors:
          update.sponsors?.map((sponsor) =>
            typeof sponsor === "object" ? sponsor._id : sponsor,
          ) || [],
        dateTime: update.dateTime
          ? new Date(update.dateTime).toISOString().slice(0, 16)
          : "",
        location: update.location || "",
        category: update.category || "general",
        amountSpent: update.amountSpent !== undefined ? update.amountSpent : "",
        currency: update.currency || "INR",
        resourceUsed: update.resourceUsed || "",
        tags: Array.isArray(update.tags) ? update.tags.join(", ") : "",
        published: update.published !== undefined ? update.published : true,
      });
    } catch (error) {
      console.error("Fetch update error:", error);

      alert(error.message || "Failed to load update");

      router.push("/admin/updates/manage");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSponsors() {
    try {
      setLoadingSponsors(true);

      const response = await fetch("/api/users", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load sponsors");
      }

      setSponsors((data.users || []).filter((user) => user.role === "sponsor"));
    } catch (error) {
      console.error("Fetch sponsors error:", error);

      alert(error.message || "Failed to load sponsors");
    } finally {
      setLoadingSponsors(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSponsorChange(sponsorId) {
    setForm((current) => {
      const alreadySelected = current.sponsors.includes(sponsorId);

      return {
        ...current,
        sponsors: alreadySelected
          ? current.sponsors.filter((id) => id !== sponsorId)
          : [...current.sponsors, sponsorId],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!form.description.trim()) {
      alert("Description is required");
      return;
    }

    if (form.visibility === "specific_sponsors" && form.sponsors.length === 0) {
      alert("Please select at least one sponsor");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        image: form.image.trim(),
        googleDriveLink: form.googleDriveLink.trim(),
        description: form.description.trim(),
        visibility: form.visibility,
        sponsors: form.visibility === "specific_sponsors" ? form.sponsors : [],
        dateTime: form.dateTime || undefined,
        location: form.location.trim(),
        category: form.category,
        amountSpent: form.amountSpent !== "" ? Number(form.amountSpent) : 0,
        currency: form.currency,
        resourceUsed: form.resourceUsed.trim(),
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        published: form.published,
      };

      const response = await fetch(`/api/admin/updates/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to modify update");
      }

      alert("Update modified successfully");

      router.push("/admin/updates/manage");
      router.refresh();
    } catch (error) {
      console.error("Modify update error:", error);

      alert(error.message || "Failed to modify update");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 space-y-5">
            <div className="h-32 animate-pulse rounded-3xl bg-gray-200" />
            <div className="h-64 animate-pulse rounded-3xl bg-gray-200" />
            <div className="h-48 animate-pulse rounded-3xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push("/admin/updates/manage")}
            className="mb-5 text-sm font-semibold text-gray-500 transition hover:text-gray-950"
          >
            ← Back to Manage Updates
          </button>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            Edit Update
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Modify the details of this project update.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic information */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-black text-gray-950">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                The main content of your update.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter update title"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe the update..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-6 text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
                />

                {form.image && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200">
                    <img
                      src={form.image}
                      alt="Update preview"
                      className="h-48 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Google Drive Link
                </label>

                <input
                  type="url"
                  name="googleDriveLink"
                  value={form.googleDriveLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>
            </div>
          </section>

          {/* Visibility */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-black text-gray-950">Visibility</h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose who can see this update.
              </p>
            </div>

            <div className="space-y-3">
              {visibilityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex cursor-pointer items-start gap-4
                    rounded-2xl border p-4
                    transition
                    ${
                      form.visibility === option.value
                        ? "border-gray-950 bg-gray-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value={option.value}
                    checked={form.visibility === option.value}
                    onChange={handleChange}
                    className="mt-1"
                  />

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {option.label}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {form.visibility === "specific_sponsors" && (
              <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-900">
                    Select Sponsors
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Only selected sponsors will be able to see this update.
                  </p>
                </div>

                {loadingSponsors ? (
                  <p className="text-sm text-gray-400">Loading sponsors...</p>
                ) : sponsors.length === 0 ? (
                  <p className="text-sm text-gray-500">No sponsors found.</p>
                ) : (
                  <div className="space-y-2">
                    {sponsors.map((sponsor) => (
                      <label
                        key={sponsor._id}
                        className="flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 transition hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={form.sponsors.includes(sponsor._id)}
                          onChange={() => handleSponsorChange(sponsor._id)}
                        />

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {sponsor.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {sponsor.email}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Details */}
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-black text-gray-950">
                Update Details
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Date & Time
                </label>

                <input
                  type="datetime-local"
                  name="dateTime"
                  value={form.dateTime}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Mumbai, India"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Amount Spent
                </label>

                <input
                  type="number"
                  min="0"
                  name="amountSpent"
                  value={form.amountSpent}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Currency
                </label>

                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                >
                  <option value="INR">INR — Indian Rupee</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Resource Used
                </label>

                <input
                  type="text"
                  name="resourceUsed"
                  value={form.resourceUsed}
                  onChange={handleChange}
                  placeholder="Materials, equipment, etc."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Tags
                </label>

                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="engineering, testing, prototype"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none focus:bg-white"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Separate tags with commas.
                </p>
              </div>
            </div>
          </section>

          {/* Publishing */}
          {/* <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-5">
              <div>
                <h2 className="text-lg font-black text-gray-950">Publishing</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Control whether this update is visible.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    published: !current.published,
                  }))
                }
                className={`
                  relative h-7 w-12 shrink-0 rounded-full
                  transition
                  ${form.published ? "bg-emerald-500" : "bg-gray-300"}
                `}
              >
                <span
                  className={`
                    absolute top-1 h-5 w-5 rounded-full
                    bg-white shadow-sm
                    transition
                    ${form.published ? "left-6" : "left-1"}
                  `}
                />
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-sm font-semibold text-gray-700">
                {form.published ? "Published" : "Draft"}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {form.published
                  ? "This update can be displayed to users according to its visibility."
                  : "This update will not be displayed to users."}
              </p>
            </div>
          </section> */}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/updates/manage")}
              className="rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                rounded-full
                bg-gray-950
                px-7 py-3.5
                text-sm font-bold
                text-white
                transition
                hover:bg-gray-800
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
