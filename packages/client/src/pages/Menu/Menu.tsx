import s from './Menu.module.css'
import gs from "../../main.module.css"
import { NavLink, useFetcher, useLoaderData } from 'react-router'
import { LevelItem } from './components/LevelItem';
import { useEffect, useState } from 'react';
import type { LevelInput } from '../../schemas/level.schema';
import type { RankedGame } from '../../schemas/game.schema';
import { Leaderboard } from '../Leaderboard/Leaderboard';

export function Menu() {
  const fetcher = useFetcher();
  const levels = useLoaderData<LevelInput[]>();
  const [selectedLvl, setSelectedLvl] = useState<LevelInput>(levels[0]);
  const [leaderboard, setLeaderboard] = useState<RankedGame[]>([]);
  useEffect(() => {
    if (!fetcher.data) return;
    if (fetcher.data.action === "leaderboard") {
      setLeaderboard(fetcher.data.leaderboard);
    }
  }, [fetcher.data])
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
                isSelected={selectedLvl.id === lvl.id}
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
          <fetcher.Form
            method='POST'
          >
            <input
              type="hidden"
              name='levelId'
              value={selectedLvl.id}
            />
            <button
              className={s.navLink}
              name='intent'
              value='leaderboard'
            >
              Leaderboard
            </button>
          </fetcher.Form>
        </div>
      </div>
      {leaderboard.length > 0 &&
        <div
          className={gs.veil}
          onClick={() => setLeaderboard([])}
        >
          <div
            className={s.leaderboardContainer}
          >

            <Leaderboard
              levelTitle={selectedLvl.title}
              leaderboard={leaderboard}
            />
          </div>

        </div>
      }
    </main>
  )
}
