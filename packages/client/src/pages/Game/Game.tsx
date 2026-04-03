import { GameContext } from './Game.context';
import { useLoaderData } from 'react-router'
import s from './Game.module.css'
import gs from "../../main.module.css"
import type { GameLoaderProps } from './Game.loader';
import type { CoordinateInput } from '../../schemas/level.schema';
import type { Solution } from '../../schemas/game.schema';
import { useRef, useState } from 'react';
import { Thumbnails } from './components/Thumbnails';
import { GameHeader } from './components/GameHeader';
import { PreGameMenu } from './components/PreGameMenu';
import { PostGameMenu } from './components/PostGameMenu';
import { RankList } from '../../components/RankList';
import { useGameTimer } from './hooks/useGameTimer';
import { ThumbPicker } from './components/ThumbPicker';
import { isMatch } from '../../utils/game';

type GameState = "pre-game" | "playing" | "post-game";


export function Game() {
  const { level } = useLoaderData<GameLoaderProps>();
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [picking, setPicking] = useState<boolean>(false);
  const [targetCoord, setTargetCoord] = useState<CoordinateInput | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>(
    () => level.solutions.map((coord) => ({ ...coord, solved: false }))
  );
  const isPlaying = gameState === "playing";
  const timer = useGameTimer();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlay: Record<Exclude<GameState, "playing">, React.ReactNode> = {
    "pre-game": (
      <PreGameMenu
        title={level.title}
        handleStart={start}>
        <Thumbnails
          solutions={solutions}
          imgSrc={level.imageUrl}
        />
      </PreGameMenu>
    ),
    "post-game": (
      <PostGameMenu
        title="You won!"
        handleRetry={() => console.log("retry")}
        nextLevel={String(level.index + 1)}>
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
  function handlePickerClick(solution: Solution) {
    if (!targetCoord) return;
    console.log("Is Picking:", targetCoord, solution)
    if (!isMatch(targetCoord, { x: solution.x, y: solution.y })) {
      setTargetCoord(null);
      setPicking(false);
      return;
    }

    setSolutions(prev =>
      prev.map(s =>
        s.id === solution.id ? { ...s, solved: true } : s
      )
    );
    console.log("matched!", solutions);
    setPicking(false);
    setTargetCoord(null);
    setPicking(false);

    if (solutions.every(s => s.solved)) {
      timer.stop();
      setGameState("post-game");
    }
  }
  return (
    <GameContext.Provider value={{ handlePickerClick }}>

      <div className={gs.vignette}></div>
      <div
        className={s.body}
      >

        <main
          className={s.main}
        >
          {isPlaying ?
            <GameHeader
              title={level.title}
              time={timer.time}
            >
            </GameHeader>
            :
            <div></div>
          }
          <div
            className={s.game}
          >
            <div
              className={s.imgWrapper}
              ref={wrapperRef}
            >
              <img
                className={`${s.gameImg} ${!isPlaying ? gs.blurred : ""}`}
                src={level.imageUrl}
                alt=""
                onClick={isPlaying ? handleImgClick : undefined}
              />

              {picking &&
                <ThumbPicker
                  position={targetCoord!}
                >
                  <Thumbnails
                    imgSrc={level.imageUrl}
                    solutions={solutions}
                    handleClick={handlePickerClick}
                  />

                </ThumbPicker>
              }
            </div>
          </div>
          {isPlaying ?
            <>

              <div
                className={s.sideSolutionsContainer}
              >


                <Thumbnails
                  solutions={solutions}
                  imgSrc={level.imageUrl}
                />
              </div>
            </>

            :
            <>
              <div className={gs.vignette}></div>
              {overlay[gameState]}
            </>
          }
        </main >
      </div >
    </GameContext.Provider>
  )
}
