import { useLoaderData } from 'react-router'
import s from './Game.module.css'
import type { GameLoaderProps } from './Game.loader';
import type { Coordinate } from '../../types/entities';
import { useEffect, useRef, useState } from 'react';
import { Timer } from './components/Timer';
import { formatTime } from '../../utils/formatting';

export function Game() {
  const { game } = useLoaderData<GameLoaderProps>();
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    return () => stop();
  }, []);


  function startTimer() {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 10);
  };
  function stopTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }
  function handleImgClick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.width) * 100;
    console.log({ x, y });
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
      </header>
      <div
        className={s.game}
      >
        <img
          className={s.gameImg}
          src={game.source}
          alt=""
          onClick={handleImgClick}
        />
      </div>
    </main>
  )
}
