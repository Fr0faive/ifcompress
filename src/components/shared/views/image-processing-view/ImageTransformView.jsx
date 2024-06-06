"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import FileInput from "../../fileinput";
import Slider from "../../Slider";

export default function ImageTransformView() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState();

  const handleOnChange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log("File selected");
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {selectedImage ? (
        <>
          <div className="relative w-full h-[200px] sm:h-[400px]">
            <Cropper
              image={URL.createObjectURL(selectedImage)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="p-4 flex flex-col items-stretch sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center">
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                handleOnChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          </div>
        </>
      ) : (
        <FileInput
          handleOnChange={handleOnChange}
          label="Select Image"
          accept="image/*"
          id="image-cropper"
        />
      )}
    </div>
  );
}
