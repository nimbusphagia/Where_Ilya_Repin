import type { Coordinate } from "../types/entities";

export async function extractThumbnail(
  src: string,
  coord: Coordinate,
  thumbW = 80,
  thumbH = 80,
  zoom = 1
): Promise<string> {
  const img = await loadImage(src);

  const srcAspect = img.naturalWidth / img.naturalHeight;
  const thumbAspect = thumbW / thumbH;

  let cropW: number, cropH: number;
  if (srcAspect > thumbAspect) {
    cropW = thumbW / zoom;
    cropH = cropW / srcAspect;
  } else {
    cropH = thumbH / zoom;
    cropW = cropH * srcAspect;
  }

  const idealCropX = (coord.x / 100) * img.naturalWidth - cropW / 2;
  const idealCropY = (coord.y / 100) * img.naturalHeight - cropH / 2;

  const clampedX = Math.max(0, Math.min(idealCropX, img.naturalWidth - cropW));
  const clampedY = Math.max(0, Math.min(idealCropY, img.naturalHeight - cropH));

  const shiftX = clampedX - idealCropX;
  const shiftY = clampedY - idealCropY;

  const destW = cropW * zoom;
  const destH = cropH * zoom;

  const destOffsetX = (thumbW - destW) / 2 + shiftX * zoom;
  const destOffsetY = (thumbH - destH) / 2 + shiftY * zoom;

  const canvas = document.createElement('canvas');
  canvas.width = thumbW;
  canvas.height = thumbH;

  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, thumbW, thumbH);
  ctx.drawImage(
    img,
    clampedX, clampedY, cropW, cropH,
    destOffsetX, destOffsetY, destW, destH
  );

  return canvas.toDataURL();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}
