import { GameContext } from './Game.context';
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
import { ThumbPicker } from './components/ThumbPicker';
import { isMatch } from '../../utils/game';
import type { Solution } from '../../types/entities';

type GameState = "pre-game" | "playing" | "post-game";


export function Game() {
  const { game, nextId } = useLoaderData<GameLoaderProps>();
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [picking, setPicking] = useState<boolean>(false);
  const [targetCoord, setTargetCoord] = useState<Coordinate | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>(
    () => game.solutions.map((coord) => ({ ...coord, solved: false }))
  );
  const isPlaying = gameState === "playing";
  const timer = useGameTimer();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlay: Record<Exclude<GameState, "playing">, React.ReactNode> = {
    "pre-game": (
      <PreGameMenu
        title={game.name}
        handleStart={start}>
        <Thumbnails
          solutions={solutions}
          imgSrc={game.source}
        />
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
    if (picking) return;

    const wrapperRect = wrapperRef.current!.getBoundingClientRect();
    const x = ((e.clientX - wrapperRect.left) / wrapperRect.width) * 100;
    const y = ((e.clientY - wrapperRect.top) / wrapperRect.height) * 100;
    console.log("Clicked: ", { x, y });
    setTargetCoord({ x, y });
    setPicking(true);
  }
  function handlePickerClick(solution: Coordinate) {
    if (!targetCoord) return;
    console.log("Is Picking:", targetCoord, solution)
    if (!isMatch(targetCoord, { x: solution.x, y: solution.y })) {
      setTargetCoord(null);
      setPicking(false);
      return;
    }

    const updated = solutions.map(s =>
      s.id === solution.id ? { ...s, solved: true } : s
    );
    setSolutions(updated);
    console.log("matched!", updated);
    setPicking(false);
    setTargetCoord(null);
    setPicking(false);

    if (updated.every(s => s.solved)) {
      timer.stop();
      setGameState("post-game");
    }
  }
  return (
    <GameContext.Provider value={{ handlePickerClick }}>
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
              solutions={solutions}
              imgSrc={game.source}
            />
          </GameHeader>
          <div
            className={s.game}
          >
            <div
              className={s.imgWrapper}
              ref={wrapperRef}
            >
              <img
                className={`${s.gameImg} ${!isPlaying ? gs.blurred : ""}`}
                src={game.source}
                alt=""
                onClick={isPlaying ? handleImgClick : undefined}
              />

              {picking &&
                <ThumbPicker
                  position={targetCoord!}
                >
                  <Thumbnails
                    imgSrc={game.source}
                    solutions={solutions}
                    handleClick={handlePickerClick}
                  />

                </ThumbPicker>
              }
            </div>

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
    </GameContext.Provider>
  )
}
