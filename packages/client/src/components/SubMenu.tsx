import { Form } from "react-router"
import s from "../main.module.css"
import type { ActionLink } from "../types/ui"

type SubMenuProps = {
  actions: ActionLink[],
  className: string,
}

export function SubMenu({ actions, className }: SubMenuProps) {
  return (
    <div
      className={`${s.subMenu} ${className}`}
    >
      {
        actions.map((a) => {
          return (
            <Form
              method="POST"
              action={a.path}
            >
              <button
                type="submit"
                name={a.intent ? "intent" : ""}
                value={a.intent}
              >
                {a.name}
              </button>
            </Form>
          )
        })
      }
    </div>
  )
}
