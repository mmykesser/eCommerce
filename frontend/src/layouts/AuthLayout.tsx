import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
      <header className="flex flex-col items-center gap-sm text-center">
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

      <p className="text-center text-label-sm text-on-surface-variant">
        {footerText}{' '}
        <Link className="text-primary hover:underline" to={footerLinkHref}>
          {footerLinkText}
        </Link>
      </p>
    </GlassCard>
  );
};
