import type { PropsWithChildren } from "react"
import gs from "../../../main.module.css"
import s from "../Game.module.css"
import { UsernameForm } from "./UsernameForm"

type Props = {
  title: string,
  time: string,
  nextLevel: string
}

export function PostGameMenu({ title, time, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`${s.postGameMenu} ${gs.glass}`}
    >
      <div
        className={s.postGameHeader}
      >
        <h1>{title}</h1>
      </div>
      <div
        className={s.timeDescription}
      >
        <h2>Completed in:</h2>
        <p>{time}s</p>
      </div>
      <UsernameForm >
        <div
          className={s.formDescription}
        >
          <p>Leave your name to see how you score</p>
        </div>
      </UsernameForm>
      {children}
    </div>

  )
}
