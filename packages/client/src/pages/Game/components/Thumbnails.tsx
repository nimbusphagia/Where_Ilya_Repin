import { SubjectThumbnail } from "./SubjectThumbnail"
import s from "../Game.module.css";
import type { Coordinate, Solution } from "../../../types/entities";

type Props = {
  solutions: Solution[];
  imgSrc: string,
  handleClick?: (solution: Coordinate) => void,
}

export function Thumbnails({ imgSrc, solutions, handleClick }: Props) {
  return (<div
    className={s.solutions}
  >
    {solutions?.map((solution) =>
      <SubjectThumbnail
        key={solution.x + "-" + solution.y}
        src={imgSrc}
        coord={solution}
        thumbH={80}
        thumbW={80}
        zoom={1}
        className={solution.solved ? s.solved : ""}
        handleClick={handleClick ? () => handleClick(solution) : undefined}
      />

    )}
  </div>
  )
}
