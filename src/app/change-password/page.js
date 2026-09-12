"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Get logged-in user using the authentication cookie
  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/users/change-password", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    }

    getUser();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword === currentPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to change password.");
        return;
      }

      setSuccess("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        if (user?.role === "superadmin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eeeeec] px-6 py-12 text-black">
      {/* Background shapes */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-black/[0.04]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full border-[70px] border-black/[0.035]" />

      <div className="pointer-events-none absolute right-[12%] top-[15%] h-24 w-24 rotate-12 border border-black/10" />

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] md:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT SIDE */}
          <section className="relative hidden min-h-[650px] overflow-hidden bg-black p-12 text-white md:flex md:flex-col md:justify-between">
            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-white/[0.06]" />

            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/[0.035]" />

            <div className="relative z-10">
              <div className="mb-12 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-bold">
                  V
                </div>

                <span className="text-sm font-semibold tracking-[0.25em]">
                  VOLARE
                </span>
              </div>

              <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-white/40">
                FIRST LOGIN
              </p>

              <h2 className="max-w-sm text-5xl font-semibold leading-[0.95] tracking-[-0.04em]">
                Secure your
                <br />
                account.
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-white/50">
                You&apos;re using a temporary password provided by the
                administrator. Create a new password to continue.
              </p>
            </div>

            {/* Visual */}
            <div className="relative z-10 flex items-center justify-center py-10">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10">
                <div className="absolute h-40 w-40 rounded-full border border-white/10" />

                <div className="absolute h-24 w-24 rounded-full bg-white/[0.06]" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.05]">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <circle cx="12" cy="15" r="1" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="relative z-10 text-xs text-white/30">
              Your account. Your password. Your control.
            </p>
          </section>

          {/* RIGHT SIDE */}
          <section className="flex min-h-[650px] items-center justify-center p-7 sm:p-12">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              {/* Heading */}
              <div className="mb-9">
                <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-black/40">
                  SECURITY
                </p>

                <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Change password
                </h1>

                <p className="mt-4 text-sm leading-6 text-black/50">
                  Set a new password before continuing.
                </p>
              </div>

              {/* Account */}
              <div className="mb-7 rounded-2xl border border-black/10 bg-[#f5f5f3] p-4">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                  Account
                </p>

                <p className="truncate text-sm font-medium">
                  {user?.email || "Loading account..."}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Current password */}
              <div className="mb-5">
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-black/60"
                >
                  Current password
                </label>

                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    className="h-14 w-full rounded-xl border border-black/10 bg-[#f8f8f6] px-4 pr-20 text-sm outline-none transition focus:border-black focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-black/40 transition hover:text-black"
                  >
                    {showCurrent ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="mb-5">
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-black/60"
                >
                  New password
                </label>

                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="h-14 w-full rounded-xl border border-black/10 bg-[#f8f8f6] px-4 pr-20 text-sm outline-none transition focus:border-black focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-black/40 transition hover:text-black"
                  >
                    {showNew ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-black/35">
                  Minimum 6 characters
                </p>
              </div>

              {/* Confirm password */}
              <div className="mb-8">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-black/60"
                >
                  Confirm new password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    className="h-14 w-full rounded-xl border border-black/10 bg-[#f8f8f6] px-4 pr-20 text-sm outline-none transition focus:border-black focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-black/40 transition hover:text-black"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Updating password..."
                ) : (
                  <>
                    Update password
                    <span className="ml-3 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

              <p className="mt-5 text-center text-xs text-black/30">
                🔒 Your password is securely encrypted.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
