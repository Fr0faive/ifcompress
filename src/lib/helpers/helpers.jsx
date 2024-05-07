import imageCompression from "browser-image-compression";
const defaultOptions = {
  maxSizeMB: 50,
  maxWidthOrHeight: 400,
  useWebWorker: true,
};
export function compressFile(imageFile, options = defaultOptions) {
  return imageCompression(imageFile, options);
}

export function download(file, filename) {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.click();
  window.URL.revokeObjectURL(url);
}
