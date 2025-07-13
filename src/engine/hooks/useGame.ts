import { useMemo, useState } from "react";
import Game from "../core/game/game.entity";

const useGame = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateUiStatesCallback = (game: Game) => {
    setIsRunning(game.isRunning());
    setCurrentTime(game.getCurrentTime());
  };

  const game = useMemo(() => new Game(updateUiStatesCallback), []);

  return {
    isRunning,
    currentTime,
    start: () => game.start(),
    stop: () => game.stop(),
  };
};

export default useGame;
