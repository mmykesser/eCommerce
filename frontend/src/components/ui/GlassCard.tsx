import type { ReactNode } from 'react';

interface IGlassCardProps {
  children: ReactNode;
  maxWidth?: string;
}

export const GlassCard = ({ children, maxWidth = 'max-w-card-sm' }: IGlassCardProps) => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden p-margin-mobile antialiased"
      style={{
        background:
          'radial-gradient(circle at left top, rgb(208, 228, 255) 0%, rgb(249, 249, 249) 40%, rgb(193, 220, 255) 100%)',
      }}
    >
      <main className={`relative z-10 w-full ${maxWidth}`}>
        <div className="flex flex-col gap-lg rounded-3xl border border-white/60 bg-surface-container-lowest/40 p-xl shadow-[0_8px_40px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
          {children}
        </div>
      </main>
    </div>
  );
};
