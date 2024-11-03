import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./CroppedBanner"; // To'g'ri import
import {
  dataUrlToBlob,
  generateFileName,
  getExtensionFromMimeType,
} from "../cropper_utils/CropperUtils";

const FixedCropper = ({
  blockBanner,
  setCroppedImage,
  croppedImage,
  setBlockBanner,
  setProfileBannerFile,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImageUrl.fr_url);
      const response = await fetch(croppedImageUrl.fr_url);
      const blob = await response.blob();
      const file = new File([blob], croppedImageUrl.url, { type: blob.type });
      setProfileBannerFile(file);
      setBlockBanner(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="cropper_avatar"
      style={{ display: blockBanner ? "block" : "none" }}
    >
      <input
        type="file"
        accept="image/*"
        id="media34"
        onChange={handleImageUpload}
      />
      {imageSrc && (
        <div style={{ position: "relative", width: "100%", height: "400px" }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={700 / 200}
            cropShape="rect"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition={false}
          />
        </div>
      )}
      {imageSrc && <button onClick={handleCropSave}>Save</button>}
    </div>
  );
};

export default FixedCropper;
