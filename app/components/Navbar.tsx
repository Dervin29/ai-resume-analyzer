import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    await auth.signOut();
    setOpen(false);
    navigate("/auth?next=/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 mx-auto max-w-7xl rounded-2xl bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-12">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
            R
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Resumind
            </span>

            <span className="text-xs text-gray-500">
              AI Resume Analyzer
            </span>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Secondary CTA */}
          <Link
            to="/upload"
            className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-50"
          >
            Upload
          </Link>

          {/* User Menu */}
          {auth.isAuthenticated && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white shadow-sm transition hover:scale-105"
              >
                U
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
                  <div className="border-b border-black/5 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Account
                    </p>

                    <p className="text-xs text-gray-500">
                      Manage your profile
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;