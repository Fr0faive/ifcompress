"use client";
import React, { useState, useRef } from "react";
import FileInput from "@/components/shared/fileinput";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
// import { Mp3Encoder } from "lamejs";

export default function AudioPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const fileRef = useRef(null);

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('audioFile', fileRef.current.files[0]);

    const response = await axios.post('/api/convert', formData);

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'converted.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to convert audio');
    }
  };

  return (
    <section className="min-h-screen p-4 w-full">
      <div className="bg-white w-full rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        <form onSubmit={handleUpload}>
          <FileInput
            label="Select Audio File"
            accept="audio/*"
            onChange={handleFileUpload}
            fileRef={fileRef}
          />
          <button type="submit">Convert</button>
        </form>
      </div>
    </section>
  );
}
