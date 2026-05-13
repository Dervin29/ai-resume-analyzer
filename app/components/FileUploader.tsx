import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const maxFileSize = 20 * 1024 * 1024;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const k = 1024;

    const sizeIndex = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, sizeIndex);

    return `${parseFloat(size.toFixed(2))} ${units[sizeIndex]}`;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0] || null;

      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    },
    [onFileSelect]
  );

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setFile(null);
    onFileSelect?.(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`group relative overflow-hidden rounded-2xl border border-dashed p-8 transition-all duration-200 cursor-pointer ${
          isDragActive
            ? "border-black/30 bg-black/[0.03]"
            : "border-black/10 bg-white hover:border-black/20 hover:bg-black/[0.02]"
        }`}
      >
        <input {...getInputProps()} />

        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/[0.015] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        {/* Empty State */}
        {!file ? (
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl border transition-all duration-200 ${
                isDragActive
                  ? "border-black/20 bg-black text-white"
                  : "border-black/10 bg-black/[0.03]"
              }`}
            >
              <img
                src="/icons/info.svg"
                alt="Upload"
                className={`h-10 w-10 transition-all duration-200 ${
                  isDragActive ? "invert" : "opacity-80"
                }`}
              />
            </div>

            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {isDragActive
                  ? "Drop your resume here"
                  : "Upload your resume"}
              </h3>

              <p className="text-sm leading-6 text-gray-500">
                Drag and drop your PDF file here, or click to browse
              </p>

              <div className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-xs font-medium text-gray-600">
                PDF only • Max {formatFileSize(maxFileSize)}
              </div>
            </div>
          </div>
        ) : (
          /* Selected File State */
          <div
            className="relative z-10 flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-w-0 items-center gap-4">
              {/* PDF Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                <img
                  src="/images/pdf.png"
                  alt="PDF"
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* File Details */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 md:text-base">
                  {file.name}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-gray-300" />

                  <span className="text-xs font-medium text-green-600">
                    Ready to analyze
                  </span>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={removeFile}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white transition-all duration-200 hover:bg-black hover:text-white"
            >
              <img
                src="/icons/cross.svg"
                alt="Remove"
                className="h-4 w-4"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;