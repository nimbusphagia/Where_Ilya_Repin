import s from './Menu.module.css'
import gs from "../../main.module.css"
import { useLoaderData } from 'react-router'
import type { Menu } from './types/ui';
import { LevelItem } from './components/LevelItem';
import type { Level } from './types/ui';
import { SubMenu } from '../../components/SubMenu';
import { useState } from 'react';

export function Menu() {
  const { levels, user } = useLoaderData<Menu>();
  const [selectedLvl, setSelectedLvl] = useState<Level>(levels[0]);
  const menuActions = [
    {
      name: "Play",
      path: `/game/${selectedLvl.id}`,
      intent: "play",
    },
    {
      name: "Leaderboard",
      path: "",
      intent: "showLeaderboard"
    },
    {
      name: user ? "Account" : "Create Account",
      path: "",
      intent: user ? "showRegister" : "showAccount",
    },
  ];
  return (
    <main
      className={s.body}
    >
      <h1
        className={`${gs.logo} ${s.title}`}
      >Where is the Bauhaus?</h1>
      <div
        className={s.levels}
      >

        {
          levels.map((lvl) => {
            return (
              <LevelItem
                key={lvl.id}
                id={lvl.id}
                name={lvl.name}
                thumbnail={lvl.thumbnail}
                unlocked={lvl.unlocked}
                handleClick={() => setSelectedLvl(lvl)}
                className={lvl === selectedLvl ? s.selectedLvl : ""}
              />
            )
          })
        }
      </div>
      <SubMenu
        actions={menuActions}
        className={s.subMenu}
      />
    </main>
  )
}
