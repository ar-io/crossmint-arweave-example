import { useAuth } from "@crossmint/client-sdk-react-ui";

function AuthButton() {
  const { login, logout, user } = useAuth();

  return (
    <div className="flex flex-col items-center gap-4">
      {user == null ? (
        <button
          type="button"
          onClick={login}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Crossmint
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">User Info</h3>
            <p><span className="font-medium">User ID:</span> {user?.userId}</p>
            <p><span className="font-medium">Email:</span> {user?.email || "Not available"}</p>
            {user?.google && (
              <p><span className="font-medium">Google:</span> {user.google.displayName}</p>
            )}
            {user?.farcaster && (
              <p><span className="font-medium">Farcaster:</span> {user.farcaster.username}</p>
            )}
          </div>
          
          <button
            type="button"
            onClick={logout}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthButton;
