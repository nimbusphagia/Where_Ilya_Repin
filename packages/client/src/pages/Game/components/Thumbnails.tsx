import { SubjectThumbnail } from "./SubjectThumbnail"
import s from "../Game.module.css";
import type { GameLevel } from "../../../types/entities";

type Props = {
  game: GameLevel;
}

export function Thumbnails({ game }: Props) {
  return (<div
    className={s.solutions}
  >
    {game.solutions?.map((solution) =>
      <SubjectThumbnail
        key={solution.x + "-" + solution.y}
        src={game.source}
        coord={solution}
        thumbH={80}
        thumbW={80}
        zoom={0.8}
      />

    )}
  </div>
  )
}
