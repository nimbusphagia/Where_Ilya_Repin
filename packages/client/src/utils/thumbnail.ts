import type { Coordinate } from "../types/entities";

export async function extractThumbnail(
  src: string,
  coord: Coordinate,
  percent = 20
): Promise<string> {
  const img = await loadImage(src);

  const cropW = (percent / 100) * img.naturalWidth;
  const cropH = (percent / 100) * img.naturalHeight;

  const idealCropX = (coord.x / 100) * img.naturalWidth - cropW / 2;
  const idealCropY = (coord.y / 100) * img.naturalHeight - cropH / 2;

  const clampedX = Math.max(0, Math.min(idealCropX, img.naturalWidth - cropW));
  const clampedY = Math.max(0, Math.min(idealCropY, img.naturalHeight - cropH));

  const canvas = document.createElement('canvas');
  canvas.width = cropW;
  canvas.height = cropH;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, clampedX, clampedY, cropW, cropH, 0, 0, cropW, cropH);

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
