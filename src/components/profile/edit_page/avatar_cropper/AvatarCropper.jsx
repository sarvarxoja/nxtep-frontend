// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "./cropImage"; // cropImage.js faylidagi funksiya
// import "./AvatarCropper.css";

// const AvatarCropper = ({ onClose, onCropComplete }) => {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const onCropChange = (location) => setCrop(location);
//   const onZoomChange = (zoomLevel) => setZoom(zoomLevel);

//   const onCropCompleteCallback = useCallback((_, croppedPixels) => {
//     setCroppedAreaPixels(croppedPixels);
//   }, []);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => setImage(reader.result);
//   };

//   const handleCrop = async () => {
//     try {
//       const croppedImage = await getCroppedImg(image, croppedAreaPixels);
//       onCropComplete(croppedImage);
//     } catch (error) {
//       console.error("Kesishda xato:", error);
//     }
//   };

//   return (
//     <div className="crop-container">
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       {image && (
//         <>
//           <Cropper
//             image={image}
//             crop={crop}
//             zoom={zoom}
//             aspect={1}
//             cropShape="round"
//             onCropChange={onCropChange}
//             onZoomChange={onZoomChange}
//             onCropComplete={onCropCompleteCallback}
//           />
//           <button onClick={handleCrop}>Kesish</button>
//           <button onClick={onClose}>Bekor qilish</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default AvatarCropper;
