import { useEffect, useState } from "react";

export default function ImagePreviewer({ imageFile, children }) {
  const [imageURL, setImageURL] = useState();
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImageURL(url);
    return () => url && URL.revokeObjectURL(url);
  }, [imageFile]);
  return imageFile ? (
    <>
      <div className="border border-solid border-gray-300 rounded-lg p-3 h-[16rem]">
        <img src={imageURL} alt="" className="w-full h-full object-cover" />
      </div>
      <p className="font-mono font-medium text-2xl">{`${(
        imageFile.size /
        1024 /
        1024
      ).toFixed(2)} MB`}</p>
    </>
  ) : null;
}
