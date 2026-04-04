import type { RankedGame } from "../../schemas/game.schema"
import { formatTime } from "../../utils/formatting";
import s from "./Leaderboard.module.css";

type LeaderboardProps = {
  leaderboard: RankedGame[],
  levelTitle: string,
}
export function Leaderboard({ leaderboard, levelTitle }: LeaderboardProps) {
  return (
    <div className={s.body}>
      <header className={s.header}>
        <h2>{levelTitle}</h2>
      </header>
      <main className={s.main}>
        <ol className={s.gameList}>
          {leaderboard.map((game, i) =>
            <li
              className={s.scoreItem}
              key={game.id}
            >
              <p>{i}</p>
              <p>{game.player.username}</p>
              <p>{formatTime(Math.round(game.timeMs / 10))}</p>
            </li>
          )}
        </ol>
      </main>
    </div>
  )
}
