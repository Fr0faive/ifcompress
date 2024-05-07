"use client";
import React, { useState } from "react";
import FileInput from "@/components/shared/fileinput";
import AudioPreview from "@/components/shared/AudioPreview";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Mp3Encoder } from "lamejs";

export default function AudioPage() {
  const [mp3Blob, setMp3Blob] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const audioData = new Float32Array(e.target.result);
      const mp3Blob = await encodeAudioToMP3(audioData);
      setMp3Blob(mp3Blob);
    };

    reader.readAsArrayBuffer(file);
  };

  const encodeAudioToMP3 = async (audioData) => {
    const mp3Encoder = new Mp3Encoder(1, 44100, 128); // Mode Mono
    const mp3Data = mp3Encoder.encode(audioData);
    const mp3Blob = new Blob([new Uint8Array(mp3Data)], { type: "audio/mp3" });
    return mp3Blob;
  };

  return (
    <section className="w-full p-4">
      <div className="bg-white w-full rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        <FileInput
          label="Select Audio File"
          accept="audio/*"
          handleOnChange={handleFileUpload}
        />

        {mp3Blob && <audio controls src={URL.createObjectURL(mp3Blob)} />}
      </div>
    </section>
  );
}
