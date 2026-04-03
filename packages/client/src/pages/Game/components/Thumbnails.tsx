import { SubjectThumbnail } from "./SubjectThumbnail"
import s from "../Game.module.css";
import gs from "../../../main.module.css"
import type { Solution } from "../../../schemas/game.schema";

type Props = {
  solutions: Solution[];
  imgSrc: string,
  handleClick?: (solution: Solution) => void,
}

export function Thumbnails({ imgSrc, solutions, handleClick }: Props) {
  return (<div
    className={`${s.solutions} ${gs.glass}`}
  >
    {solutions?.map((solution) =>

      <SubjectThumbnail
        key={solution.id}
        src={imgSrc}
        solution={solution}
        percent={10}
        handleClick={handleClick ? () => handleClick(solution) : undefined}
      />

    )}
  </div>
  )
}
