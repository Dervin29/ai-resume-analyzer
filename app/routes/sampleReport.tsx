import type { Route } from "./+types/sample-report";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sample Resume Report | Resumind" },
    {
      name: "description",
      content: "Preview a sample AI-powered resume analysis report.",
    },
  ];
}

const strengths = [
  "Strong technical skill section with relevant keywords",
  "Clean resume structure with readable formatting",
  "Good use of quantified achievements",
  "Relevant frontend development experience",
];

const improvements = [
  "Projects section lacks measurable impact",
  "Resume summary feels generic and repetitive",
  "Missing ATS keywords for React ecosystem roles",
  "Too much spacing between sections",
];

const atsKeywords = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "Node.js",
  "Git",
  "Performance Optimization",
  "Responsive Design",
];

export default function SampleReport() {
  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_35%),linear-gradient(to_bottom,_#ffffff,_#f1f5f9)]">
      <Navbar />

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 lg:px-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-gray-700">
              Sample AI Analysis Report
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
              See What A Professional Resume Review Looks Like
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Most resume tools give vague advice. Resumind provides structured
              feedback, ATS insights, and actionable improvements that help you
              build stronger resumes.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98]"
              >
                Analyze My Resume
              </Link>

              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-50"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* Report Header */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Score Card */}
          <div className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              ATS Score
            </p>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-7xl font-bold tracking-tight text-gray-900">
                82
              </span>

              <span className="pb-3 text-lg font-medium text-gray-500">
                /100
              </span>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[82%] rounded-full bg-black" />
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              Strong resume foundation with good technical relevance. Needs
              better keyword optimization and more measurable project impact.
            </p>
          </div>

          {/* Resume Summary */}
          <div className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Resume Overview
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  Frontend Developer Resume
                </h2>
              </div>

              <div className="rounded-2xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Good ATS Match
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Readability</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">88%</h3>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Keyword Match</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">76%</h3>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Formatting</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">91%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Sections */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Strengths */}
          <div className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-lg">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Strengths
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  What's Working
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {strengths.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-green-100 bg-green-50/70 p-4"
                >
                  <p className="leading-7 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="rounded-3xl border border-white/30 bg-white/60 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-lg">
                !
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Improvements
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Needs Attention
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {improvements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-red-100 bg-red-50/70 p-4"
                >
                  <p className="leading-7 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ATS Keywords */}
        <div className="mt-14 rounded-3xl border border-black/5 bg-white/60 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              ATS Optimization
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Recommended Keywords
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Adding relevant technical keywords improves ATS visibility and
              increases the likelihood of passing automated resume filters.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {atsKeywords.map((keyword) => (
              <div
                key={keyword}
                className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-black px-8 py-14 text-center text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Your Resume Is Either Helping You Or Hurting You
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
            Weak resumes silently fail ATS filters every day. Analyze your
            resume, identify problems, and improve your chances with structured
            AI-powered feedback.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98]"
            >
              Analyze My Resume
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}