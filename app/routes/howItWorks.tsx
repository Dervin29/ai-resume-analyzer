import type { Route } from "./+types/how-it-works";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "How It Works | Resumind" },
    {
      name: "description",
      content: "Learn how Resumind analyzes resumes with AI.",
    },
  ];
}

const steps = [
  {
    id: "01",
    title: "Upload Your Resume",
    description:
      "Upload your PDF resume securely in seconds. Resumind extracts and processes your resume content automatically.",
  },
  {
    id: "02",
    title: "AI Resume Analysis",
    description:
      "Our AI evaluates your resume structure, ATS compatibility, readability, keyword optimization, and overall impact.",
  },
  {
    id: "03",
    title: "Get Detailed Feedback",
    description:
      "Receive actionable suggestions, resume scoring, and improvement recommendations tailored to modern hiring standards.",
  },
  {
    id: "04",
    title: "Improve & Re-Analyze",
    description:
      "Update your resume, upload improved versions, and track progress across multiple submissions.",
  },
];

const features = [
  "ATS Compatibility Scoring",
  "AI-Powered Resume Feedback",
  "Keyword Optimization",
  "Resume Performance Tracking",
  "Clean Dashboard Experience",
  "Instant Resume Insights",
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_35%),linear-gradient(to_bottom,_#ffffff,_#f1f5f9)]">
      <Navbar />

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 lg:px-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-gray-700">
              How Resumind Works
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
              Resume Analysis Built For Modern Hiring
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Resumind helps you identify resume weaknesses, improve ATS
              compatibility, and optimize your resume using structured
              AI-powered feedback.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98]"
              >
                Analyze My Resume
              </Link>

            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-14">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Simple 4-Step Process
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Most resume tools dump generic feedback. Resumind focuses on
              actionable analysis that actually improves interview chances.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className="group rounded-3xl border border-white/30 bg-white/60 p-7 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold text-black/10 transition-all duration-300 group-hover:text-black/20">
                    {step.id}
                  </span>

                  <div className="rounded-xl bg-black/5 px-3 py-1 text-xs font-semibold text-gray-700">
                    Step {step.id}
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 rounded-3xl border border-black/5 bg-white/60 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              What You Get
            </h2>

            <p className="mt-3 text-gray-600">
              Resumind is designed to help job seekers build stronger resumes
              using data-driven feedback instead of guesswork.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-black px-8 py-14 text-center text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Your Resume Shouldn't Be Guesswork
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
            Most resumes fail before a recruiter even reads them. Analyze your
            resume, identify weaknesses, and improve your chances with
            AI-powered feedback.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98]"
            >
              Upload Resume
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