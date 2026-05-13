import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Feedback for your new job" },
  ];
};

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  const next = location.search.split("next=")[1] || "/";

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_35%),linear-gradient(to_bottom,_#ffffff,_#f1f5f9)] flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-3xl border border-black/5 bg-white/80 p-8 shadow-sm backdrop-blur-md">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Login to continue your job journey
          </p>
        </div>

        {/* Button Area */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <button
              disabled
              className="h-11 w-full rounded-xl bg-black/70 text-sm font-semibold text-white opacity-70"
            >
              Loading...
            </button>
          ) : auth.isAuthenticated ? (
            <button
              onClick={auth.signOut}
              className="h-11 w-full rounded-xl border border-black/10 bg-white text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={auth.signIn}
              className="h-11 w-full rounded-xl bg-black text-sm font-semibold text-white shadow-sm transition hover:bg-gray-900 active:scale-[0.98]"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;