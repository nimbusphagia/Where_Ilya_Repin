import { Form } from "react-router";
import gs from "../../../main.module.css"
import s from "../Game.module.css"
import type { PropsWithChildren } from "react";

export function UsernameForm({ children }: PropsWithChildren) {
  return (
    <Form
      method="PATCH"
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
        />
      </div>
      <div
        className={s.btnContainer}
      >
        <button
          type="submit"
          className={gs.btn}
        >Submit</button>
      </div>
    </Form>
  )
}
