// // import { createImage as blobCreateImage } from "canvas-to-blob";

// // Mahalliy createImage funksiyasi uchun boshqa nom tanlaymiz (masalan, loadImage)
// const loadImage = (url) =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });

// export default async function getCroppedImg(imageSrc, crop) {
//   const image = await loadImage(imageSrc); // Mahalliy loadImage funksiyasidan foydalanamiz
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   canvas.width = crop.width;
//   canvas.height = crop.height;

//   ctx.drawImage(
//     image,
//     crop.x,
//     crop.y,
//     crop.width,
//     crop.height,
//     0,
//     0,
//     crop.width,
//     crop.height
//   );

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       resolve(blob);
//     }, "image/jpeg");
//   });
// }