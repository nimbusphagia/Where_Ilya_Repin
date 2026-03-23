import type { Coordinate } from "../types/entities";

export async function extractThumbnail(
  src: string,
  coord: Coordinate,
  thumbW = 80,
  thumbH = 80,
  zoom = 3
): Promise<string> {
  const img = await loadImage(src);

  const cropW = thumbW / zoom;
  const cropH = thumbH / zoom;

  const cropX = (coord.x / 100) * img.naturalWidth - cropW / 2;
  const cropY = (coord.y / 100) * img.naturalHeight - cropH / 2;

  const canvas = document.createElement('canvas');
  canvas.width = thumbW;
  canvas.height = thumbH;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(
    img,
    Math.max(0, cropX), Math.max(0, cropY),
    cropW, cropH,
    0, 0,
    thumbW, thumbH
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
  })
}
