export const LoginPage = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-margin-mobile antialiased"
      style={{
        background:
          'radial-gradient(circle at left top, rgb(208, 228, 255) 0%, rgb(249, 249, 249) 40%, rgb(193, 220, 255) 100%)',
      }}
    >
      <main className="relative z-10 w-full max-w-auth-card">
        <div className="flex flex-col gap-lg rounded-3xl border border-white/60 bg-surface-container-lowest/40 p-xl shadow-[0_8px_40px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
          <header className="mb-sm flex flex-col items-center gap-sm text-center">
            <span
              className="material-symbols-outlined mb-xs text-[40px] text-primary"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              devices
            </span>
            <h1 className="text-display-lg-mobile tracking-tight text-primary">Sign In</h1>
            <p className="text-body-md text-on-surface-variant">
              Welcome back! Please sign in to continue
            </p>
          </header>

          <form className="flex flex-col gap-md" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-xs">
              <label className="ml-xs text-label-sm text-on-surface-variant" htmlFor="email">
                Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                  mail
                </span>
                <input
                  id="email"
                  placeholder="mail@example.com"
                  required
                  type="email"
                  className="h-14 w-full rounded-xl border border-white/80 bg-white/60 pr-md pl-12 text-body-md text-primary placeholder-on-surface-variant/50 shadow-sm transition-all focus:bg-white/80"
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="ml-xs text-label-sm text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-md text-on-surface-variant">
                  lock
                </span>
                <input
                  id="password"
                  placeholder="***********"
                  required
                  type="password"
                  className="h-14 w-full rounded-xl border border-white/80 bg-white/60 pr-md pl-12 text-body-md text-primary placeholder-on-surface-variant/50 shadow-sm transition-all focus:border-primary focus:bg-white/80 focus:outline-hidden"
                />
              </div>
              <div className="mt-xs flex justify-end">
                <a
                  href="#"
                  className="text-label-sm text-secondary transition-all hover:text-primary"
                >
                  Forgot password
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="mt-sm flex h-14 w-full items-center justify-center rounded-xl bg-primary text-title-sm text-on-primary transition-transform hover:bg-inverse-surface active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-sm text-center text-label-sm text-on-surface-variant">
            Don't have an account?{' '}
            <a className="text-primary hover:underline" href="#">
              Create yours now
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};
