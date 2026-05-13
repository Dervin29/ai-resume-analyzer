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
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-xl text-center transition cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          {file ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <div className=" flex items-center space-x-3">
                <div>
                  <p className="text-lg font-semibold text-green-600 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                className="  p-2 cursor-pointer"
                onClick={(e) => {
                  onFileSelect?.(null);
                }}
                type="button"
              >
                <img src="/icons/cross.svg" alt="remove" className=" w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img
                  src="/icons/info.svg"
                  alt="Upload Icon"
                  className="size-20"
                />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag &
                drop
              </p>

              <p className="text-sm text-gray-400">
                PDF only (max {formatFileSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
