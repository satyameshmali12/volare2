"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.css";
import TopLoader from "@/components/TopLoader";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mouse position used by the eyes
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Wrong login reaction
  const [wrongLogin, setWrongLogin] = useState(false);

  /*
   * Track the mouse across the whole window.
   *
   * x and y are converted to values between -1 and +1.
   *
   * -1 = left / top
   *  0 = center
   * +1 = right / bottom
   */
  useEffect(() => {
    function handleMouseMove(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;

      const y = (e.clientY / window.innerHeight) * 2 - 1;

      setMousePosition({
        x,
        y,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /*
   * Calculate pupil movement.
   *
   * Normal:
   *   pupil follows mouse.
   *
   * Show password:
   *   pupil does the exact opposite.
   */
  const eyeX = showPassword ? mousePosition.x * -7 : mousePosition.x * 7;

  const eyeY = showPassword ? mousePosition.y * -7 : mousePosition.y * 7;

  const eyeStyle = {
    "--eye-x": `${eyeX}px`,
    "--eye-y": `${eyeY}px`,
  };

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setWrongLogin(false);
    setLoading(true);

    setProgress(10);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      setProgress(60);

      const data = await response.json();

      /*
       * IMPORTANT:
       * Check response.ok BEFORE accessing data.user.
       *
       * Otherwise an invalid login could cause:
       * "Cannot read properties of undefined"
       */
      if (!response.ok) {
        setError(data.message || "Invalid email or password");

        /*
         * Trigger the reaction even if the user
         * submits wrong credentials multiple times.
         */
        setWrongLogin(false);

        requestAnimationFrame(() => {
          setWrongLogin(true);
        });

        return;
      }

      if (data.user?.mustChangePassword === true) {
        router.push("/change-password");
        return;
      }

      if (data.user?.role === "superadmin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);

      setError("Something went wrong. Please try again.");

      setWrongLogin(false);

      requestAnimationFrame(() => {
        setWrongLogin(true);
      });
    } finally {
      setLoading(false);
    }
  }
  const [progress, setProgress] = useState(0);

  return (
    <main className={styles.page}>
      {/* =====================================================
          LEFT SIDE
          ===================================================== */}

      <section className={styles.visualSide}>
        <TopLoader progress={progress} />
        <div className={styles.visualContent}>
          <p className={styles.smallText}>KEEP IT SECRET</p>

          <h2>
            Someone is
            <br />
            watching...
          </h2>

          <p className={styles.description}>
            Your password deserves some privacy.
          </p>

          {/* =================================================
              WATCHING CHARACTERS
              ================================================= */}

          <div
            className={`
              ${styles.watchers}
              ${showPassword ? styles.lookAway : ""}
              ${wrongLogin ? styles.wrongReaction : ""}
            `}
          >
            {/* =================================================
                ORANGE FACE
                ================================================= */}

            <div
              className={`
                ${styles.face}
                ${styles.orangeFace}
              `}
            >
              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.mouth} />
            </div>

            {/* =================================================
                PURPLE FACE
                ================================================= */}

            <div
              className={`
                ${styles.face}
                ${styles.purpleFace}
              `}
            >
              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.mouth} />
            </div>

            {/* =================================================
                BLACK FACE
                ================================================= */}

            <div
              className={`
                ${styles.face}
                ${styles.blackFace}
              `}
            >
              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.mouth} />
            </div>

            {/* =================================================
                YELLOW FACE
                ================================================= */}

            <div
              className={`
                ${styles.face}
                ${styles.yellowFace}
              `}
            >
              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.eye}>
                <span className={styles.pupil} style={eyeStyle} />
              </div>

              <div className={styles.mouth} />
            </div>
          </div>

          {/* =================================================
              REACTION TEXT
              ================================================= */}

          <div className={styles.reactionText}>
            {wrongLogin ? (
              <>Wait... that's not right 😭</>
            ) : showPassword ? (
              <>Okay okay, we can't see it 🙈</>
            ) : (
              <>👀 We can see your password</>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          RIGHT SIDE - LOGIN
          ===================================================== */}

      <section className={styles.formSide}>
        <form onSubmit={handleLogin} className={styles.form}>
          {/* Heading */}

          <div className={styles.heading}>
            <p>Welcome back!</p>

            <h1>Log in</h1>

            <span>Enter your details to continue.</span>
          </div>

          {/* Error */}

          {error && <div className={styles.error}>{error}</div>}

          {/* Email */}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <button
                type="button"
                className={styles.showButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login button */}

          <button
            type="submit"
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Security */}

          <p className={styles.securityText}>🔒 Your password stays private.</p>
        </form>
      </section>
    </main>
  );
}
