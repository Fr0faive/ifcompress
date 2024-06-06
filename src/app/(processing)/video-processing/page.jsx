"use client";
import FileInput from "@/components/shared/fileinput";
import VideoPreviewer from "@/components/shared/VideoPreview";
import { useState } from "react";

export default function VideoProcessing() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };
  return (
    <section className="min-h-screen p-4 w-full">
      <div className="bg-white w-full rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        <h1 className="text-3xl text-blue-500 font-semibold">
          Video Processing
        </h1>
        <FileInput
          label={selectedFile ? selectedFile.name : "Select Video File"}
          id="video"
          accept="video/*"
          handleOnChange={handleFileUpload}
        />
        {selectedFile && (
          <>
            <h2 className="text-gray-700 font-semibold">Preview original</h2>
            <video
              src={URL.createObjectURL(selectedFile)}
              controls
              className="w-1/2 h-full object-cover"
            />
            <p className="font-mono text-gray-500 font-medium text-2xl">{`${(
              selectedFile.size /
              1024 /
              1024
            ).toFixed(2)} MB`}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Process
            </button>
          </>
        )}
      </div>
    </section>
  );
}
