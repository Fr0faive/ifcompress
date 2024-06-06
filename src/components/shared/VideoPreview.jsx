import { useEffect, useState, useRef } from "react";

export default function VideoPreviewer({ videoFile }) {
  const [previewURL, setPreviewURL] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoFile) return;

    // Create a video element (off-screen)
    const tempVideo = document.createElement("video");
    tempVideo.muted = true; // Ensure no audio plays during preview
    tempVideo.src = URL.createObjectURL(videoFile);
    tempVideo.playsInline = true; // For iOS compatibility

    // Wait for the video to load metadata
    tempVideo.onloadedmetadata = () => {
      tempVideo.currentTime = 1; // Seek to a few seconds in for preview
      tempVideo.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = tempVideo.videoWidth;
        canvas.height = tempVideo.videoHeight;
        canvas.getContext("2d").drawImage(tempVideo, 0, 0);
        setPreviewURL(canvas.toDataURL());
        URL.revokeObjectURL(tempVideo.src); // Clean up
      };
    };
  }, [videoFile]);

  return videoFile ? (
    <>
      {/* Display the video if preview is ready, otherwise a loading message */}
      {previewURL ? (
        <video
          ref={videoRef}
          src={previewURL}
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <p>Loading preview...</p>
      )}

      <p className="font-mono text-gray-500 font-medium text-2xl">{`${(
        videoFile.size /
        1024 /
        1024
      ).toFixed(2)} MB`}</p>
    </>
  ) : null;
}
