import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "Resumind | Review" },
  {
    name: "description",
    content: "Detailed overview of your resume",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const resume = await kv.get(`resume:${id}`);

        if (!resume) return;

        const data = JSON.parse(resume);

        const resumeBlob = await fs.read(data.resumePath);
        if (!resumeBlob) return;

        const pdfBlob = new Blob([resumeBlob], {
          type: "application/pdf",
        });

        const generatedResumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(generatedResumeUrl);

        const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) return;

        const generatedImageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(generatedImageUrl);

        setFeedback(data.feedback);
      } catch (error) {
        console.error("Failed to load resume:", error);
      }
    };

    loadResume();

    return () => {
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_35%),linear-gradient(to_bottom,_#ffffff,_#f1f5f9)]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm max-w-7xl mx-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-black/20 hover:bg-gray-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-transform duration-200 group-hover:-translate-x-0.5">
              <img
                src="/icons/back.svg"
                alt="Back"
                className="h-3 w-3 invert"
              />
            </div>

            <span className="text-sm font-semibold text-gray-800">
              Back to Homepage
            </span>
          </Link>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-900 md:inline-flex"
            >
              Open PDF
            </a>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 md:px-8 lg:flex-row lg:px-12">
        {/* Resume Preview */}
        <section className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] lg:w-[42%]">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Resume Preview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View uploaded resume snapshot
                </p>
              </div>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50"
                >
                  View PDF
                </a>
              )}
            </div>

            <div className="relative flex h-full min-h-[650px] items-center justify-center overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-b from-gray-50 to-white p-4">
              {imageUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full w-full"
                >
                  <img
                    src={imageUrl}
                    title="resume"
                    alt="Resume preview"
                    className="h-full w-full rounded-2xl object-contain shadow-sm transition-all duration-300 hover:scale-[1.01]"
                  />
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-2xl bg-black/5 p-5">
                    <img
                      src="/images/resume-scan-2.gif"
                      alt="Loading resume"
                      className="w-[140px]"
                    />
                  </div>

                  <p className="text-sm font-medium text-gray-500">
                    Loading preview...
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="flex-1">
          <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-md md:p-8">
            <div className="mb-8 flex flex-col gap-4 border-b border-black/5 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-sm font-medium text-gray-700">
                  AI Resume Analysis
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  Resume Review
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                  Analyze ATS compatibility, resume quality, formatting, and
                  content effectiveness through AI-powered feedback.
                </p>
              </div>

              {feedback?.ATS?.score && (
                <div className="flex w-fit flex-col items-center justify-center rounded-2xl border border-black/5 bg-black px-6 py-5 text-white shadow-sm">
                  <span className="text-3xl font-bold">
                    {feedback.ATS.score}
                  </span>

                  <span className="text-xs font-medium uppercase tracking-wide text-white/70">
                    ATS Score
                  </span>
                </div>
              )}
            </div>

            {feedback ? (
              <div className="animate-in fade-in flex flex-col gap-8 duration-700">
                <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                  <Summary feedback={feedback} />
                </div>

                <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                  <ATS
                    score={feedback.ATS.score || 0}
                    suggestions={feedback.ATS.tips || []}
                  />
                </div>

                <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                  <Details feedback={feedback} />
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-5">
                <div className="rounded-3xl bg-black/5 p-6">
                  <img
                    src="/images/resume-scan-2.gif"
                    alt="Analyzing resume"
                    className="w-[180px]"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Analyzing Resume
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Generating detailed AI feedback and ATS insights...
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Resume;
