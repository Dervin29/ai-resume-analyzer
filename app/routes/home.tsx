import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    {
      name: "description",
      content: "Smart feedback for your dream job!",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      try {
        const resumes = (await kv.list("resume:*", true)) as KVItem[];

        const parsedResumes = resumes?.map(
          (resume) => JSON.parse(resume.value) as Resume,
        );

        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Failed to load resumes:", error);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_35%),linear-gradient(to_bottom,_#ffffff,_#f1f5f9)]">
      <Navbar />

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-gray-700">
                AI Resume Analyzer
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
                Track Your Applications & Resume Ratings
              </h1>

              {!loadingResumes && resumes?.length === 0 ? (
                <p className="max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                  No resumes found yet. Upload your first resume and get
                  structured AI-powered feedback instantly.
                </p>
              ) : (
                <p className="max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                  Review your submissions, monitor resume performance, and
                  improve your chances with detailed AI insights.
                </p>
              )}
            </div>

            {!loadingResumes && resumes?.length === 0 && (
              <div className="pt-2">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98]"
                >
                  Upload Resume
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Loader */}
        {loadingResumes && (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4">
            <div className="rounded-2xl border border-white/30 bg-white/70 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-md">
              <img
                src="/images/resume-scan-2.gif"
                alt="Loading resumes"
                className="w-[180px] object-contain"
              />
            </div>

            <p className="text-sm font-medium text-gray-500">
              Loading your resumes...
            </p>
          </div>
        )}

        {/* Resume Grid */}
        {!loadingResumes && resumes.length > 0 && (
          <div className="mt-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Resumes
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {resumes.length} resume
                  {resumes.length > 1 ? "s" : ""} available
                </p>
              </div>

              <Link
                to="/upload"
                className="hidden rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-black/20 hover:bg-gray-50 md:inline-flex"
              >
                Upload New
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="rounded-2xl border border-white/30 bg-white/50 p-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(15,23,42,0.12)]"
                >
                  <ResumeCard resume={resume} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loadingResumes && resumes?.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 bg-white/50 px-6 py-16 text-center backdrop-blur-sm">
            <div className="mb-5 rounded-2xl bg-black/5 p-4">
              <img
                src="/images/resume-scan-2.gif"
                alt="Empty resumes"
                className="w-[120px]"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              No resumes uploaded
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Upload your resume to receive AI-powered feedback, ATS scoring,
              and improvement suggestions.
            </p>

            <Link
              to="/upload"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98]"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
