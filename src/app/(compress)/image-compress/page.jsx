"use client";
import FileInput from "@/components/shared/fileinput";
import { useState } from "react";
import { compressFile, download } from "@/lib/helpers/helpers";
import ImagePreviewer from "@/components/shared/imagePreview";

export default function ImagePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState();
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  const handleOnChange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log("File selected");
  };

  const handleDownload = () => {
    setIsDownload(true);
    download(compressedImage, `compressed-${selectedImage.name}`);
    setIsDownload(false);
  };
  const handleCompressFile = async () => {
    if (selectedImage) {
      try {
        setIsCompressing(true);
        const compressedFile = await compressFile(selectedImage);
        setCompressedImage(compressedFile);
        console.log(compressedImage);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCompressing(false);
      }
    }
  };
  return (
    <section className="flex min-h-screen items-center flex-col p-4 gap-3">
      <FileInput handleOnChange={handleOnChange} />
      <article className={selectedImage ? "flex p-6 gap-3" : "hidden"}>
        <aside>
          <div className="flex justify-center items-center flex-col gap-10 w-full">
            <ImagePreviewer imageFile={selectedImage} />
            {selectedImage && (
              <>
                <p className="font-semibold text-xl">{selectedImage.name}</p>
                <button
                  disabled={isCompressing}
                  onClick={handleCompressFile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {isCompressing ? "Compressing..." : "Compress"}
                </button>
              </>
            )}
          </div>
        </aside>
        <aside>
          <div className="flex justify-center items-center flex-col gap-10 w-full">
            <ImagePreviewer imageFile={compressedImage} />
            {compressedImage && (
              <>
                <p className="font-semibold text-xl">
                  Compressed-{compressedImage.name}
                </p>
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {isDownload ? "Downloading..." : "Download"}
                </button>
              </>
            )}
          </div>
        </aside>
      </article>
    </section>
  );
}
