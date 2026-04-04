import type { RankedGame } from "../../schemas/game.schema"
import { formatTime } from "../../utils/formatting";
import s from "./Leaderboard.module.css";
import { useGameContext } from "../Game/Game.context";
import { useEffect, useRef } from "react";

type LeaderboardProps = {
  leaderboard: RankedGame[],
  levelTitle: string,
}
export function Leaderboard({ leaderboard, levelTitle }: LeaderboardProps) {
  const { game } = useGameContext()
  const currentRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    setTimeout(() => {
      currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, []); return (
    <div className={s.body}>
      <header className={s.header}>
        <h2>{levelTitle}</h2>
      </header>
      <main className={s.main}>
        <ol className={s.gameList}>
          {leaderboard.map((g, i) =>
            <li
              className={`${s.scoreItem} ${g.id === game?.id ? s.currentScore : undefined}`}
              key={g.id}
              ref={g.id === game?.id ? currentRef : null}
            >
              <p>{++i}</p>
              <p
                className={s.username}
              >{g.player.username}</p>
              <p>{formatTime(Math.round(g.timeMs / 10))}</p>
            </li>
          )}
        </ol>
      </main>
    </div>
  )
}
