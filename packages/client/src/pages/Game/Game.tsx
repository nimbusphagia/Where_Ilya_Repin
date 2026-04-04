import { GameContext } from './Game.context';
import { useFetcher, useLoaderData, useNavigate } from 'react-router'
import s from './Game.module.css'
import gs from "../../main.module.css"
import type { GameLoaderProps } from './Game.loader';
import type { CoordinateInput } from '../../schemas/level.schema';
import type { RankedGame, Game, Solution } from '../../schemas/game.schema';
import { useEffect, useRef, useState } from 'react';
import { Thumbnails } from './components/Thumbnails';
import { GameHeader } from './components/GameHeader';
import { PreGameMenu } from './components/PreGameMenu';
import { SavingMenu } from './components/SavingMenu';
import { useGameTimer } from './hooks/useGameTimer';
import { ThumbPicker } from './components/ThumbPicker';
import { isMatch } from '../../utils/game';
import { formatTime } from '../../utils/formatting';
import { PostGameMenu } from './components/PostGameMenu';

type GameState = "pre-game" | "playing" | "saving" | "post-game";


export function Game() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { level } = useLoaderData<GameLoaderProps>();
  const [game, setGame] = useState<Game | null>(null);
  const [leaderboard, setLeaderboard] = useState<RankedGame[]>([]);
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const isPlaying = gameState === "playing";
  const [picking, setPicking] = useState<boolean>(false);
  const [targetCoord, setTargetCoord] = useState<CoordinateInput | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>(
    () => level.solutions.map((coord) => ({ ...coord, solved: false }))
  );
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
    "saving": (
      <SavingMenu
        title={level.title}
        time={formatTime(timer.time)}
        handleRegister={registerGame}
      />
    ),
    "post-game": (
      <PostGameMenu
        leaderboard={leaderboard!}
        levelTitle={level.title}
        handleNext={() => handleNext()}
      />
    )
  };

  useEffect(() => {
    if (!fetcher.data) return;
    if (fetcher.data.action === "start") {
      setGame(fetcher.data.game);
      timer.start();
    } else if (fetcher.data.action === "registerUser") {
      setLeaderboard(fetcher.data.leaderboard);
    } else if (fetcher.data.action === "nextGame") {
      console.log(fetcher.data.nextLevelId);
      navigate(`/game/${fetcher.data.nextLevelId}`);
    } else if (fetcher.data.action === "home") {
      navigate("/");
    }
  }, [fetcher.data]);

  function start() {
    setGameState("playing");
    fetcher.submit({
      intent: "start",
    }, {
      method: "POST",
      action: ""
    });
  }
  function stop(game: Game) {
    timer.stop();
    setGameState("saving");

    fetcher.submit({
      intent: "end",
      gameId: game.id,
    },
      {
        method: "POST",
        action: ""
      });
  }
  function registerGame(username: string, game: Game | null) {
    if (!game) {
      return;
    }
    setGameState("post-game");
    fetcher.submit({
      intent: "registerUser",
      gameId: game.id,
      username: username
    }, {
      method: "POST",
      action: ""
    })
  }
  function handleNext() {
    fetcher.submit({
      intent: "nextGame",
      levelIndex: level.index,
    }, {
      method: "POST",
      action: ""
    })

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
    if (!isMatch(targetCoord, { x: solution.x, y: solution.y })) {
      setTargetCoord(null);
      setPicking(false);
      return;
    }

    const updatedSolutions = solutions.map(s =>
      s.id === solution.id ? { ...s, solved: true } : s
    );

    setSolutions(updatedSolutions);
    setPicking(false);
    setTargetCoord(null);

    if (updatedSolutions.every(s => s.solved)) {
      stop(game!);
    }
  }
  return (
    <GameContext.Provider value={{ handlePickerClick, game }}>
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
