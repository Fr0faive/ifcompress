"use client";
import React, { useState, useRef } from "react";
import FileInput from "@/components/shared/fileinput";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ffmpeg from "ffmpeg.js/ffmpeg-mp4.js";
import { download } from "@/lib/helpers/helpers";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function AudioPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = (useRef < HTMLVideoElement) | (null > null);
  const messageRef = (useRef < HTMLParagraphElement) | (null > null);

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
    setIsLoading(false);
  };

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

  const handleCompress = async (fileAudio) => {
    setLoading(true);
    console.log(fileAudio);
    try {
      if (fileAudio.type !== "audio/mpeg") {
        Toastify({
          text: "File harus bertipe audio mpeg",
          duration: 3000,
        }).showToast();
        setLoading(false);
        return;
      }
      console.log(fileAudio);

      const reader = new FileReader();
      console.log(reader);
      reader.onload = async (event) => {
        const result = event.target.result;
        console.log(result);
        const transcode = ffmpeg({
          MEMFS: [{ name: fileAudio.name, data: result }],
          arguments: [
            "-i",
            fileAudio.name,
            "-b:a",
            "64k",
            "-f",
            "mp3",
            "output.mp3",
          ],
        });

        const { MEMFS } = transcode;
        const compressedBlob = new Blob([MEMFS[0].data], {
          type: "audio/mp3",
        });
        setCompressedFile(compressedBlob);
        setLoading(false);
      };

      reader.readAsArrayBuffer(fileAudio);
    } catch (error) {
      console.error("Error compressing audio:", error);
      Toastify({
        text: "Error compressing audio",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
      setLoading(false);
    }
  };

  return loaded ? (
    <section className="min-h-screen p-4 w-full">
      <div className="bg-white w-full rounded-2xl flex justify-center items-center flex-col p-4 gap-4">
        <FileInput
          label="Select Audio File"
          accept="audio/*"
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
  ) : (
    <button
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      onClick={load}
    >
      Load ffmpeg-core
      {isLoading && (
        <span className="animate-spin ml-3">
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
          </svg>
        </span>
      )}
    </button>
  );
}
