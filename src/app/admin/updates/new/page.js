"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUpdatePage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [submitting, setSubmitting] = useState(false);

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

  // ---------------------------------------
  // LOAD SPONSORS
  // ---------------------------------------

  useEffect(() => {
    async function loadSponsors() {
      try {
        const response = await fetch("/api/users?role=sponsor");

        const data = await response.json();

        if (response.ok) {
          setUsers(data.users || []);
        }
      } catch (error) {
        console.error("Failed to load sponsors:", error);
      } finally {
        setLoadingUsers(false);
      }
    }

    loadSponsors();
  }, []);

  // ---------------------------------------
  // INPUT
  // ---------------------------------------

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ---------------------------------------
  // SPONSOR SELECTION
  // ---------------------------------------

  function toggleSponsor(id) {
    setForm((previous) => {
      const alreadySelected = previous.sponsors.includes(id);

      return {
        ...previous,
        sponsors: alreadySelected
          ? previous.sponsors.filter((sponsorId) => sponsorId !== id)
          : [...previous.sponsors, id],
      };
    });
  }

  // ---------------------------------------
  // SUBMIT
  // ---------------------------------------

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    if (form.visibility === "specific_sponsors" && form.sponsors.length === 0) {
      alert("Please select at least one sponsor.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,

        amountSpent: form.amountSpent === "" ? 0 : Number(form.amountSpent),

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        sponsors: form.visibility === "specific_sponsors" ? form.sponsors : [],
      };

      const response = await fetch("/api/admin/updates", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error("API STATUS:", response.status);
        console.error("API RESPONSE:", text);

        alert(`API Error ${response.status}\n\n${text.slice(0, 500)}`);

        return;
      }

      if (!response.ok) {
        alert(data.message || "Failed to create update");
        return;
      }

      alert("Update created successfully.");
      setForm({
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

      // router.push("/admin/updates");
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 text-sm text-gray-500 hover:text-gray-900"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Add Update</h1>

          <p className="mt-2 text-gray-500">
            Share project progress, achievements and resource utilization.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFORMATION */}

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">Update Information</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Propulsion System Testing Completed"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what happened..."
                  rows={7}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-500"
                />
              </div>
            </div>
          </section>

          {/* MEDIA */}

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">Media & Documents</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-500"
                />

                <p className="mt-2 text-xs text-gray-400">
                  We can connect this to Cloudinary later for direct image
                  uploading.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Google Drive Folder / Link
                </label>

                <input
                  type="url"
                  name="googleDriveLink"
                  value={form.googleDriveLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-gray-500"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Add a Google Drive link containing the documents or files for
                  this update. Access is controlled by Google Drive.
                </p>
              </div>
            </div>
          </section>

          {/* VISIBILITY */}

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">Who can see this?</h2>

            <div className="space-y-3">
              {/* PUBLIC */}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={form.visibility === "public"}
                  onChange={handleChange}
                  className="mt-1"
                />

                <div>
                  <p className="font-medium">Public</p>

                  <p className="text-sm text-gray-500">
                    Visible on the public Volare website.
                  </p>
                </div>
              </label>

              {/* MEMBERS + SPONSORS */}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="members_sponsors"
                  checked={form.visibility === "members_sponsors"}
                  onChange={handleChange}
                  className="mt-1"
                />

                <div>
                  <p className="font-medium">Members & Sponsors</p>

                  <p className="text-sm text-gray-500">
                    Visible only inside the private portal.
                  </p>
                </div>
              </label>

              {/* SPECIFIC SPONSORS */}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="specific_sponsors"
                  checked={form.visibility === "specific_sponsors"}
                  onChange={handleChange}
                  className="mt-1"
                />

                <div>
                  <p className="font-medium">Specific Sponsors</p>

                  <p className="text-sm text-gray-500">
                    Only selected sponsors can view this update.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* SPONSOR SELECTION */}

          {form.visibility === "specific_sponsors" && (
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">Select Sponsors</h2>

              <p className="mb-5 text-sm text-gray-500">
                These sponsors will be able to view this update inside the
                private portal.
              </p>

              {loadingUsers ? (
                <p className="text-gray-500">Loading sponsors...</p>
              ) : users.length === 0 ? (
                <p className="text-gray-500">No sponsors found.</p>
              ) : (
                <div className="space-y-2">
                  {users.map((sponsor) => (
                    <label
                      key={sponsor._id}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-4 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={form.sponsors.includes(sponsor._id)}
                        onChange={() => toggleSponsor(sponsor._id)}
                      />

                      <div>
                        <p className="font-medium">{sponsor.name}</p>

                        <p className="text-sm text-gray-500">{sponsor.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* DETAILS */}

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">Project Details</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="general">General</option>
                  <option value="project">Project</option>
                  <option value="purchase">Purchase</option>
                  <option value="testing">Testing</option>
                  <option value="competition">Competition</option>
                  <option value="event">Event</option>
                  <option value="achievement">Achievement</option>
                  <option value="milestone">Milestone</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Amount Spent
                </label>

                <input
                  type="number"
                  min="0"
                  name="amountSpent"
                  value={form.amountSpent}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Date & Time
                </label>

                <input
                  type="datetime-local"
                  name="dateTime"
                  value={form.dateTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location
                </label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="ICT Mumbai"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Resources Used
              </label>

              <textarea
                name="resourceUsed"
                value={form.resourceUsed}
                onChange={handleChange}
                placeholder="Materials, components, equipment, services..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">Tags</label>

              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="propulsion, testing, battery"
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />

              <p className="mt-2 text-xs text-gray-400">
                Separate tags using commas.
              </p>
            </div>
          </section>

          {/* PUBLISH */}

          <div className="flex justify-end pb-10">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Publishing..." : "Publish Update"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
