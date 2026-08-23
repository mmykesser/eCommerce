import { GlassCard } from './GlassCard';
interface ILoadingScreenProps {
  message?: string;
  storeTitle?: string;
}

export const LoadingScreen = ({
  message = 'Loading...',
  storeTitle = 'Aura Store',
}: ILoadingScreenProps) => {
  return (
    <GlassCard>
      <header className="flex flex-col items-center gap-sm text-center">
        <span
          className="material-symbols-outlined mb-xs text-[40px] text-primary"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          devices
        </span>
        <h1 className="text-display-lg-mobile tracking-tight text-primary">{storeTitle}</h1>
      </header>
      <div className="mt-md flex w-full flex-col items-center gap-sm">
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <div className="h-full w-full animate-progress rounded-full bg-linear-to-r from-secondary to-primary" />
        </div>
        <p className="mt-xs text-center text-label-sm text-on-surface-variant">{message}</p>
      </div>
    </GlassCard>
  );
};
