import { useLoaderData } from 'react-router'
import s from './Game.module.css'
import gs from "../../main.module.css"
import type { GameLoaderProps } from './Game.loader';
import type { Coordinate } from '../../types/entities';
import { useEffect, useRef, useState } from 'react';
import { Timer } from './components/Timer';
import { SubjectThumbnail } from './components/SubjectThumbnail';
import { formatTime } from '../../utils/formatting';

type GameState = "pre-game" | "playing" | "post-game";

export function Game() {
  const { game } = useLoaderData<GameLoaderProps>();
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [picking, setPicking] = useState<boolean>(false);
  const [pickerPos, setPickerPos] = useState<Coordinate>({ x: 0, y: 0 });
  const isPlaying = gameState === "playing";

  function start() {
    setGameState("playing");
    startTimer();
  }
  function startTimer() {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 10);
  };
  function stopTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }
  function handleImgClick(e: React.MouseEvent<HTMLImageElement>) {
    const gameRect = e.currentTarget.parentElement!.getBoundingClientRect();
    const x = ((e.clientX - gameRect.left) / gameRect.width) * 100;
    const y = ((e.clientY - gameRect.top) / gameRect.height) * 100;
    setPickerPos({ x, y });
    setPicking(!picking);
  }
  function isMatch(
    click: Coordinate,
    solution: Coordinate,
    tolerance = 5) {
    return Math.abs(click.x - solution.x) <= tolerance &&
      Math.abs(click.y - solution.y) <= tolerance;
  };

  return (
    <main
      className={s.main}
    >
      <header
        className={s.header}
      >
        <h1>
          {game.name}
        </h1>
        <Timer
          time={formatTime(time)}
        />
        <div
          className={s.solutions}
        >
          {game.solutions?.map((solution) =>
            <SubjectThumbnail
              key={solution.x + "-" + solution.y}
              src={game.source}
              coord={solution}
              thumbH={64}
              thumbW={64}
              zoom={0.8}
            />

          )}
        </div>
      </header>
      <div
        className={s.game}
      >
        {gameState === "playing" &&
          <>
            <img
              className={`${s.gameImg} ${!isPlaying ? gs.blurred : ""}`}
              src={game.source}
              alt=""
              onClick={handleImgClick}
            />
            {
              picking &&
              <div
                className={s.thumbnailPicker}
                style={{
                  top: `${pickerPos.y}%`,
                  left: `${pickerPos.x}%`,
                }}
              >
                {game.solutions?.map((solution) =>
                  <SubjectThumbnail
                    key={solution.x + "-" + solution.y}
                    src={game.source}
                    coord={solution}
                    thumbH={64}
                    thumbW={64}
                    zoom={0.8}
                  />

                )}
              </div>
            }
          </>
        }
        {gameState === "pre-game" &&
          <>
            <div
              className={gs.veil}
            >
            </div>
            <div
              className={gs.subMenu}
            >
              <header>
                <h1>{game.name}</h1>
              </header>
              <div
                className={s.solutions}
              >
                {game.solutions?.map((solution) =>
                  <SubjectThumbnail
                    key={solution.x + "-" + solution.y}
                    src={game.source}
                    coord={solution}
                    thumbH={64}
                    thumbW={64}
                    zoom={0.8}
                  />

                )}
              </div>

              <button
                className={s.startBtn}
                type='button'
                onClick={start}
              >
                START
              </button>

            </div>
          </>
        }
        {gameState === "post-game" &&
          <>
            <div
              className={s.veil}
            >
            </div>
            <img
              className={s.gameImg}
              src="/images/bg1.jpg"
              alt=""
              onClick={handleImgClick}
            />
          </>

        }
      </div>
    </main>
  )
}
