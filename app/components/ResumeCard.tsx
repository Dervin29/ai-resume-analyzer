import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();

    return () => {
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    };
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="group block overflow-hidden rounded-2xl border border-black/5 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/5 p-5">
        <div className="min-w-0 flex flex-col gap-1">
          {companyName ? (
            <h2 className="truncate text-base font-bold text-gray-900">
              {companyName}
            </h2>
          ) : (
            <h2 className="text-base font-bold text-gray-900">Resume</h2>
          )}

          {jobTitle && (
            <h3 className="truncate text-sm text-gray-500">{jobTitle}</h3>
          )}
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {/* Preview */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white p-4">
        {resumeUrl ? (
          <div className="overflow-hidden rounded-xl border border-black/5">
            <img
              src={resumeUrl}
              alt="resume preview"
              className="h-[260px] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] md:h-[300px]"
            />
          </div>
        ) : (
          <div className="flex h-[260px] items-center justify-center rounded-xl border border-dashed border-black/10 bg-white md:h-[300px]">
            <p className="text-sm text-gray-400">Loading preview...</p>
          </div>
        )}
      </div>

      {/* Footer subtle hover hint */}
      <div className="border-t border-black/5 px-5 py-3 text-xs text-gray-500">
        Click to view detailed analysis
      </div>
    </Link>
  );
};

export default ResumeCard;