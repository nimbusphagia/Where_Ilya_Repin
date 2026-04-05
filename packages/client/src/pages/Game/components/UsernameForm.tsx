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
  const isNameValid = name.trim().length > 3 && name.trim().length < 20;
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
          minLength={3}
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
          disabled={!isNameValid}
          className={`${gs.btn} ${!isNameValid ? s.disabled : undefined}`}
        >Submit</button>
      </div>
    </Form>
  )
}
