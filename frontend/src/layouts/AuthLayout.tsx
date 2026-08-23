import type { ReactNode } from 'react';
import { GlassCard } from '../components/ui/GlassCard';

interface IAuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
}: IAuthLayoutProps) => {
  return (
    <GlassCard>
      <header className="mb-sm flex flex-col items-center gap-sm text-center">
        <span
          className="material-symbols-outlined mb-xs text-[40px] text-primary"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          devices
        </span>
        <h1 className="text-display-lg-mobile tracking-tight text-primary">{title}</h1>
        <p className="text-body-md text-on-surface-variant">{subtitle}</p>
      </header>

      {children}

      <p className="mt-sm text-center text-label-sm text-on-surface-variant">
        {footerText}{' '}
        <a className="text-primary hover:underline" href={footerLinkHref}>
          {footerLinkText}
        </a>
      </p>
    </GlassCard>
  );
};
