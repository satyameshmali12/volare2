"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log("data:", data);

      if (!response.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }

      setForm({
        name: "",
        email: "",
        description: "",
      });

      setStatus("Message sent successfully!");
    } catch (error) {
      console.error(error);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#eef8f7] px-6 py-16 sm:py-20">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full border border-[#00A896]/15" />

      <div className="pointer-events-none absolute -left-20 bottom-[-100px] h-56 w-56 rounded-full border border-[#0077B6]/10" />

      <div className="relative mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0077B6]">
              Get in touch
            </p>

            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Let&apos;s talk
              <span className="text-[#00A896]">.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
              Have a question, idea, or want to work with Team Volare? Send us a
              message.
            </p>
          </div>

          {/* CONTACT DETAILS */}
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=satyameshmalimern123@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-[#0077B6] transition hover:text-[#00A896]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0077B6]/10">
                @
              </span>
              satyameshmalimern123@gmail.com
            </a>

            <p className="flex items-center gap-2 font-medium text-[#0077B6]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00A896]/10">
                ☎
              </span>
              +91 9XXXXXXXXX
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)] sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[#0077B6]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#0077B6]/10
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[#00A896]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#00A896]/10
                "
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Message
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={4}
              required
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-gray-200
                bg-gray-50
                px-4
                py-3
                text-sm
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-[#00B4D8]
                focus:bg-white
                focus:ring-4
                focus:ring-[#00B4D8]/10
              "
            />
          </div>

          {/* BUTTON */}
          <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-lg
                bg-[#0077B6]
                px-7
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#005f91]
                hover:shadow-lg
                hover:shadow-[#0077B6]/20
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>

            {status && (
              <p
                className={`text-sm font-medium ${
                  status.includes("successfully")
                    ? "text-[#00A896]"
                    : "text-red-500"
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
