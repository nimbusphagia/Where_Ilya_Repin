import s from './Menu.module.css'
import gs from "../../main.module.css"
import { NavLink, useLoaderData } from 'react-router'
import type { Menu } from './types/ui';
import { LevelItem } from './components/LevelItem';
import { useState } from 'react';
import type { LevelInput } from '../../schemas/level.schema';

export function Menu() {
  const levels = useLoaderData<LevelInput[]>();
  const [selectedLvl, setSelectedLvl] = useState<LevelInput>(levels[0]);

  return (
    <main
      className={s.body}
    >
      <header
        className={`${s.header}`}
      >
        <h1
          className={`${s.title} ${gs.logo}`}
        >Where is Ilya Repin?</h1>

      </header>
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
      <div className={s.navContainer}>
        <div className={s.nav}>
          <NavLink
            to={`/game/${selectedLvl.id}`}
            className={s.navLink}
          >Play</NavLink>
          <NavLink
            to={`/leaderboard`}
            className={s.navLink}

          >Leaderboard</NavLink>
        </div>

      </div>
    </main>
  )
}
