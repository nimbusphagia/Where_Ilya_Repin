import { Form } from "react-router";
import gs from "../../../main.module.css"
import s from "../Game.module.css"
import { useState, type PropsWithChildren } from "react";
import type { Game } from "../../../schemas/game.schema";
import { useGameContext } from "../Game.context";
type FormProps = {
  handleSubmit: (username: string, game: Game | null) => void,
}
export function UsernameForm({ handleSubmit, children }: PropsWithChildren<FormProps>) {
  const { game } = useGameContext();
  const [name, setName] = useState<string>("");
  return (
    <Form
      className={gs.form}
    >
      {children}
      <div
        className={gs.formItem}
      >
        <label
          htmlFor="username"
        >Name:</label>
        <input
          id="username"
          name="username"
          type="text"
          maxLength={20}
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        className={s.btnContainer}
      >
        <button
          type="button"
          onClick={() => handleSubmit(name, game)}
          className={gs.btn}
        >Submit</button>
      </div>
    </Form>
  )
}
