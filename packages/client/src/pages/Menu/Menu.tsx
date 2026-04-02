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
      <img
        className={gs.bgImg}
        src="https://res.cloudinary.com/dlsa973vu/image/upload/q_auto/f_auto/v1775144136/resized-image_1_dsoztq.jpg"
        alt="" />
      <h1
        className={`${gs.logo} ${s.title}`}
      >Where is Ilya Repin</h1>
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
                isSelected={selectedLvl === lvl}
              />
            )
          })
        }
      </div>
      <div className={s.subMenuContainer}>
        <SubMenu
          actions={menuActions}
          className={s.subMenu}
        />

      </div>
    </main>
  )
}
