import s from "../Game.module.css"
import { useEffect, useState } from "react"
import { extractThumbnail } from "../../../utils/thumbnail";
import type { Solution } from "../../../schemas/game.schema";

type Props = {
  src: string,
  solution: Solution,
  percent: number,
  handleClick?: (solution: Solution) => void,
  className?: string,
}

export function SubjectThumbnail({
  src,
  solution,
  percent = 10,
  handleClick,
  className
}: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    extractThumbnail(src, solution, percent).then(setDataUrl);
  }, [src, solution.x, solution.y]);

  return (
    <img
      src={dataUrl ? dataUrl : undefined}
      className={`${s.thumbImg} ${className}`}
      alt=""
      onClick={handleClick ? () => handleClick(solution) : undefined}
    />
  )
}
