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

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [progress, setProgress] = useState(0);

  // Mouse position used by the eyes
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Wrong login reaction
  const [wrongLogin, setWrongLogin] = useState(false);

  /*
   * =========================================================
   *                     CHECK AUTH
   * =========================================================
   */

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/users/me", {
          cache: "no-store",
        });
        console.log("respones", response);

        if (!response.ok) {
          setLoggedIn(false);
          return;
        }

        const data = await response.json();

        const isLoggedIn =
          data.userType === "member" ||
          data.userType === "sponsor" ||
          data.userType === "superadmin";
        console.log("is Logged In", isLoggedIn);
        setLoggedIn(isLoggedIn);
        console.log("write from the login page", loggedIn);
      } catch (error) {
        console.error("Auth check failed:", error);
        setLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  /*
   * =========================================================
   *                  MOUSE TRACKING
   * =========================================================
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
   * =========================================================
   *                     EYE MOVEMENT
   * =========================================================
   */

  const eyeX = showPassword ? mousePosition.x * -7 : mousePosition.x * 7;

  const eyeY = showPassword ? mousePosition.y * -7 : mousePosition.y * 7;

  const eyeStyle = {
    "--eye-x": `${eyeX}px`,
    "--eye-y": `${eyeY}px`,
  };

  /*
   * =========================================================
   *                       LOGIN
   * =========================================================
   */

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

      if (!response.ok) {
        setError(data.message || "Invalid email or password");

        setWrongLogin(false);

        requestAnimationFrame(() => {
          setWrongLogin(true);
        });

        setProgress(0);
        return;
      }

      /*
       * Login succeeded.
       *
       * The login API has now set the authentication cookie.
       */

      setProgress(80);

      /*
       * Refresh the server components so NavbarServer
       * runs requireSuperAdmin() again with the new cookie.
       */
      router.refresh();

      /*
       * First-time users must change their password.
       */
      if (data.user?.mustChangePassword === true) {
        setProgress(100);
        router.push("/change-password");
        return;
      }

      /*
       * Superadmin goes to admin.
       */
      if (data.user?.role === "superadmin") {
        setProgress(100);
        router.push("/admin");
      } else {
        setProgress(100);
        router.push("/");
      }
    } catch (err) {
      console.error(err);

      setError("Something went wrong. Please try again.");

      setWrongLogin(false);

      requestAnimationFrame(() => {
        setWrongLogin(true);
      });

      setProgress(0);
    } finally {
      setLoading(false);
    }
  }

  /*
   * =========================================================
   *                       LOGOUT
   * =========================================================
   */

  async function handleLogout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Logout failed");
      }

      /*
       * Cookie has been removed.
       *
       * Refresh the server components so NavbarServer
       * sees that the user is no longer authenticated.
       */
      setLoggedIn(false);
      // router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  /*
   * =========================================================
   *                   AUTH CHECK LOADING
   * =========================================================
   */

  if (checkingAuth) {
    return (
      <main className={styles.page}>
        <TopLoader progress={100} />

        <section className={styles.formSide}>
          <div className={styles.form}>
            <div className={styles.heading}>
              <p>Volare Hub</p>

              <h1>Checking...</h1>

              <span>Checking your session.</span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * =========================================================
   *                ALREADY LOGGED IN
   * =========================================================
   */

  if (loggedIn) {
    return (
      <main className={styles.loggedInPage}>
        <div className={styles.loggedInCard}>
          <div className={styles.logoMark}>V</div>

          <p className={styles.smallText}>VOLARE HUB</p>

          <h1>You're in.</h1>

          <p className={styles.description}>
            You're already signed in to your Volare account.
          </p>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? "Logging out..." : "Log Out"}
          </button>

          <p className={styles.securityText}>
            Your session is active and secure.
          </p>
        </div>
      </main>
    );
  }

  /*
   * =========================================================
   *                       LOGIN PAGE
   * =========================================================
   */

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

          {/* WATCHING CHARACTERS */}

          <div
            className={`
              ${styles.watchers}
              ${showPassword ? styles.lookAway : ""}
              ${wrongLogin ? styles.wrongReaction : ""}
            `}
          >
            {/* ORANGE FACE */}

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

            {/* PURPLE FACE */}

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

            {/* BLACK FACE */}

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

            {/* YELLOW FACE */}

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

          {/* REACTION TEXT */}

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
