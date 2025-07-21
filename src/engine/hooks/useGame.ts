import { useEffect, useState } from 'react';
import Game from '../core/game/game.entity';

const useGame = () => {
  const [game, setGame] = useState<Game>();
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

  const instantiateGame = async () => {
    setGame(new Game(updateUiStatesCallback));
  };

  useEffect(() => {
    instantiateGame();
  }, []);

  return {
    gameIsReady: !!game,
    isRunning,
    currentTime,
    start: () => game?.start(),
    stop: () => game?.stop(),
  };
};

export default useGame;
