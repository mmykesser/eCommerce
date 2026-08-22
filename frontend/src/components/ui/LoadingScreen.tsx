interface ILoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = 'Loading...' }: ILoadingScreenProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <p className="text-label-sm text-on-surface-variant">{message}</p>
    </div>
  );
};
