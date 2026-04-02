import { SubjectThumbnail } from "./SubjectThumbnail"
import s from "../Game.module.css";
import type { Solution } from "../../../schemas/game.schema";

type Props = {
  solutions: Solution[];
  imgSrc: string,
  handleClick?: (solution: Solution) => void,
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
        percent={10}
        className={solution.solved ? s.solved : ""}
        handleClick={handleClick ? () => handleClick(solution) : undefined}
      />

    )}
  </div>
  )
}
