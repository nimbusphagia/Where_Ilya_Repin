import s from "../Game.module.css"
import { useEffect, useState } from "react"
import type { Coordinate } from "../../../types/entities"
import { extractThumbnail } from "../../../utils/thumbnail";

type Props = {
  src: string,
  coord: Coordinate,
  thumbW?: number,
  thumbH: number,
  zoom?: number,
}

export function SubjectThumbnail({
  src,
  coord,
  thumbW = 80,
  thumbH = 80,
  zoom = 3
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    extractThumbnail(src, coord, thumbW, thumbH, zoom).then(setDataUrl);
  }, [src, coord.x, coord.y]);

  return (
    <img
      src={dataUrl ? dataUrl : undefined}
      className={s.thumbImg}
      width={thumbW}
      height={thumbH}
      alt="" />
  )
}
