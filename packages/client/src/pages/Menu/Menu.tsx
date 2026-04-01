import s from './Menu.module.css'
import gs from "../../main.module.css"
import { useLoaderData } from 'react-router'
import type { Menu } from './types/ui';
import { LevelItem } from './components/LevelItem';
import { SubMenu } from '../../components/SubMenu';
import { useState } from 'react';
import type { LevelInput } from '../../schemas/level.schema';

export function Menu() {
  const levels = useLoaderData<LevelInput[]>();
  const [selectedLvl, setSelectedLvl] = useState<LevelInput>(levels[0]);
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
    }];
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
                title={lvl.title}
                imageUrl={lvl.imageUrl}
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
