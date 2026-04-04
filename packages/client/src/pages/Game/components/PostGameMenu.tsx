import s from "../Game.module.css"
import type { RankedGame } from "../../../schemas/game.schema"
import { Leaderboard } from "../../Leaderboard/Leaderboard"
import { useNavigate } from "react-router"
import { useGameContext } from "../Game.context"

type Props = {
  levelTitle: string,
  leaderboard: RankedGame[],
  handleNext: () => void,
}

export function PostGameMenu({ levelTitle, leaderboard, handleNext }: Props) {
  const navigate = useNavigate();
  const { game } = useGameContext()
  return (
    <div
      className={`${s.postGameMenu}`}
    >
      <div
        className={s.floating}
      >
        <Leaderboard
          levelTitle={levelTitle}
          leaderboard={leaderboard}
          game={game!}
        />

      </div>
      <div
        className={s.btnContainer}
      >
        <button
          className={s.retryBtn}
          type='button'
          onClick={() => navigate(0)}
        >
          Retry
        </button>
        <button
          className={s.nextBtn}
          type='button'
          onClick={handleNext}
        >
          Next Level
        </button>
      </div>
    </div>
  )
}
