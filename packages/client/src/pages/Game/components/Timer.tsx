import s from "../Game.module.css"

type TimerProps = {
  time: string,
}

export function Timer({ time }: TimerProps) {
  return (
    <div
      className={s.timer}
    >
      <p>
        {time}
      </p>
    </div>
  )
}
