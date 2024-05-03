import { createWorker } from "ffmpeg.js";

const compressAudio = async (inputFile, outputFileName, options) => {
  const worker = createWorker();

  // Load ffmpeg.js
  await worker.load();

  // Run ffmpeg.js command to compress audio
  await worker.write(inputFile.name, inputFile);
  await worker.transcode(inputFile.name, outputFileName, options);

  // Terminate the worker
  await worker.terminate();

  return outputFileName;
};

export default compressAudio;
