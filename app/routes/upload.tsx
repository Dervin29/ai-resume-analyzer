import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Uploading resume...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Upload failed");

    setStatusText("Converting PDF...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Conversion failed");

    setStatusText("Uploading preview...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Image upload failed");

    setStatusText("Preparing analysis...");
    const uuid = generateUUID();

    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing resume...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );

    if (!feedback) return setStatusText("Analysis failed");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Done. Redirecting...");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.14),_transparent_35%),linear-gradient(to_bottom,_#ffffff,_#f1f5f9)]">
      <Navbar />

      <section className="mx-auto flex w-full max-w-3xl flex-col px-5 py-10 md:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Smart feedback for your dream job
          </h1>

          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Drop your resume and get ATS scoring + AI improvement tips
          </p>
        </div>

        {/* Processing State */}
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-black/5 bg-white/70 p-8 text-center shadow-sm backdrop-blur-md">
            <p className="text-sm font-medium text-gray-700">{statusText}</p>

            <img
              src="/images/resume-scan.gif"
              className="w-[220px]"
              alt="Processing"
            />
          </div>
        ) : (
          /* Form Card */
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-md md:p-8"
          >
            <div className=" w-full grid gap-5">
              {/* Company */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="company-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  id="company-name"
                  name="company-name"
                  type="text"
                  placeholder="e.g. Google"
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-black/30"
                />
              </div>

              {/* Job Title */}
              <div className=" w-full flex flex-col gap-2">
                <label
                  htmlFor="job-title"
                  className="text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  id="job-title"
                  name="job-title"
                  type="text"
                  placeholder="e.g. Frontend Engineer"
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-black/30"
                />
              </div>

              {/* Job Description */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="job-description"
                  className="text-sm font-medium text-gray-700"
                >
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  name="job-description"
                  rows={5}
                  placeholder="Paste job description here..."
                  className="w-full resize-none rounded-xl border border-black/10 bg-white p-3 text-sm outline-none transition focus:border-black/30"
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Upload Resume
                </label>

                <div className="rounded-xl border border-dashed border-black/20 bg-white p-4">
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-900 active:scale-[0.98]"
              >
                Analyze Resume
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default Upload;
