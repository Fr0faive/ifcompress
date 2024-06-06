"use client";
import React, { useState, useRef } from "react";
import FileInput from "@/components/shared/fileinput";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ffmpeg from "ffmpeg.js/ffmpeg-mp4";
import { download } from "@/lib/helpers/helpers";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from "axios";

export default function AudioPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleDownload = () => {
    setIsDownload(true);
    download(compressedFile, `compressed-${selectedFile.name}`);
    setIsDownload(false);
  };

  const handleCompress = async (file) => {
    setLoading(true);
  };

  return (
    <section className="min-h-screen p-4 w-full">
      <div className="bg-white w-full rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        <FileInput
          label={selectedFile ? selectedFile.name : "Select Audio File"}
          accept="audio/*"
          id="Audio"
          handleOnChange={handleFileUpload}
        />
        {selectedFile && (
          <>
            <h1 className="text-gray-700 font-semibold">Sebelum Compress</h1>
            <AudioPlayer src={URL.createObjectURL(selectedFile)} />
          </>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => handleCompress(selectedFile)}
        >
          {loading ? "Compressing..." : "Compress"}
        </button>
        {compressedFile && (
          <>
            <AudioPlayer src={URL.createObjectURL(compressedFile)} />
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {isDownload ? "Downloading..." : "Download"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
