import { useLoaderData } from 'react-router'
import s from './Game.module.css'
import gs from "../../main.module.css"
import type { GameLoaderProps } from './Game.loader';
import type { Coordinate } from '../../types/entities';
import { useRef, useState } from 'react';
import { Thumbnails } from './components/Thumbnails';
import { GameHeader } from './components/GameHeader';
import { PreGameMenu } from './components/PreGameMenu';
import { PostGameMenu } from './components/PostGameMenu';
import { RankList } from '../../components/RankList';
import { useGameTimer } from './hooks/useGameTimer';

type GameState = "pre-game" | "playing" | "post-game";

export function Game() {
  const { game, nextId } = useLoaderData<GameLoaderProps>();
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [picking, setPicking] = useState<boolean>(false);
  const [pickerPos, setPickerPos] = useState<Coordinate>({ x: 0, y: 0 });
  const gameRef = useRef<HTMLDivElement>(null);
  const isPlaying = gameState === "playing";
  const timer = useGameTimer();
  const overlay: Record<Exclude<GameState, "playing">, React.ReactNode> = {
    "pre-game": (
      <PreGameMenu
        title={game.name}
        handleStart={start}>
        <Thumbnails game={game} />
      </PreGameMenu>
    ),
    "post-game": (
      <PostGameMenu
        title="You won!"
        handleRetry={() => console.log("retry")}
        nextLevel={nextId}>
        <RankList />
      </PostGameMenu>
    ),
  };

  function start() {
    setGameState("playing");
    timer.start();
  }
  function handleImgClick(e: React.MouseEvent<HTMLImageElement>) {
    if (gameRef.current) {
      const gameRect = gameRef.current.getBoundingClientRect();
      const x = ((e.clientX - gameRect.left) / gameRect.width) * 100;
      const y = ((e.clientY - gameRect.top) / gameRect.height) * 100;
      setPickerPos({ x, y });
      setPicking(!picking);
    }
  }

  return (
    <div
      className={s.body}
    >
      <main
        className={s.main}
      >
        <GameHeader
          title={game.name}
          time={timer.time}
        >
          <Thumbnails
            game={game}
          />
        </GameHeader>
        <div
          className={s.game}
          ref={gameRef}
        >
          <img
            className={`${s.gameImg} ${!isPlaying ? gs.blurred : ""}`}
            src={game.source}
            alt=""
            onClick={isPlaying ? handleImgClick : undefined}
          />

          {picking &&
            <div
              className={s.thumbnailPicker}
              style={{
                top: `${pickerPos.y}%`,
                left: `${pickerPos.x}%`,
              }}
            >
              <Thumbnails
                game={game}
              />

            </div>
          }
          {!isPlaying &&
            <div
              className={gs.veil}
            >
              {overlay[gameState]}
            </div>
          }
        </div>
      </main >
    </div >
  )
}
