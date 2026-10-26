import { useAppSelector } from '../hooks/redux';

export const HomePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Home Page</h1>

      <div className="mt-4 rounded-lg border p-4">
        {user ? (
          <div>
            <p className="text-lg text-green-500">
              Welcome, <span className="font-semibold">{user.name}</span>
            </p>
            <p className="text-sm text-gray-400">You're successfully logged in</p>
          </div>
        ) : (
          <div className="text-lg text-gray-600">
            <p>You're browsing store as a guest</p>
          </div>
        )}
      </div>
    </div>
  );
};
