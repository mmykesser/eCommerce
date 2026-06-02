import { LoginForm } from '../features/auth/components/LoginForm';

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

          <LoginForm />

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
