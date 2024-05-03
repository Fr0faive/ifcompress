"use client";
import { useState } from "react";
// import compressAudio from "@/lib/audio/audioCompress";
import FileInput from "@/components/shared/fileinput";
import AudioPreview from "@/components/shared/AudioPreview";

export default function AudioPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
    console.log(selectedFile);
    console.log("File selected");
  };

  const handleCompress = async () => {
    // Set options for audio compression
    const options = "-b:a 128k"; // Example: Set audio bitrate to 128kbps

    setIsCompressing(true);
    try {
      const compressedFileName = await compressAudio(
        file,
        "compressed_audio.mp3",
        options
      );
      setCompressedAudioFile(compressedFileName);
    } catch (error) {
      console.error("Error compressing audio:", error);
      // Handle error
    } finally {
      setIsCompressing(false);
    }
  };
  return (
    <section className="w-full p-4">
      <div className="bg-white w-full rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        <FileInput
          handleOnChange={handleFileUpload}
          label="Upload Audio File"
          accept="audio/*"
        />
        {selectedFile && (
          <>
            <AudioPreview audioUrl={URL.createObjectURL(selectedFile)} />
            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              {isCompressing ? "Compressing..." : "Compress Audio"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
