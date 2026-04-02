import s from "../Game.module.css"
import { useEffect, useState } from "react"
import type { Coordinate } from "../../../types/entities"
import { extractThumbnail } from "../../../utils/thumbnail";

type Props = {
  src: string,
  coord: Coordinate,
  percent: number,
  handleClick?: (solution: Coordinate) => void,
  className?: string,
}

export function SubjectThumbnail({
  src,
  coord,
  percent = 10,
  handleClick,
  className
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    extractThumbnail(src, coord, percent).then(setDataUrl);
  }, [src, coord.x, coord.y]);

  return (
    <img
      src={dataUrl ? dataUrl : undefined}
      className={`${s.thumbImg} ${className}`}
      alt=""
      onClick={handleClick ? () => handleClick(coord) : undefined}
    />
  )
}
