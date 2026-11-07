import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className="mx-auto flex w-full max-w-card-sm flex-col items-center gap-md rounded-3xl border border-white/60 bg-surface-container-lowest/40 p-lg text-center shadow-[0_8px_40px_rgba(0,0,0,0.03)] backdrop-blur-2xl md:mt-xl md:p-xl">
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-[48px] text-on-surface-variant md:text-[64px]"
      >
        explore_off
      </span>
      <p className="text-label-sm text-on-surface-variant">Error 404</p>
      <h1 className="text-display-lg-mobile tracking-tight text-primary md:text-display-lg">
        Page not found
      </h1>
      <p className="text-body-md text-on-surface-variant">Looks like you took a wrong turn</p>
      <Link
        to="/"
        className="rounded-full bg-primary px-lg py-sm text-body-md text-on-primary transition-all hover:bg-inverse-surface active:scale-95"
      >
        Back to home
      </Link>
    </section>
  );
};
