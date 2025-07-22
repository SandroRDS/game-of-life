import { useEffect, useState } from 'react';
import Game from '../core/game/game.entity';
import type { Coordinate } from '@src/common/types/coordinate';

const useGame = () => {
  const [game, setGame] = useState<Game>();
  const [cellularAutomatonSize, setCellularAutomatonSize] = useState({
    horizontal: NaN,
    vertical: NaN,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [aliveCells, setAliveCells] = useState<Set<string>>(new Set());
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateUiStatesCallback = (game: Game) => {
    setIsRunning(game.isRunning());
    setAliveCells(game.getAliveCellsCoordinates());
    setCurrentTime(game.getCurrentTime());
  };

  const instantiateGame = async () => {
    const gameInstance = new Game(updateUiStatesCallback);
    setCellularAutomatonSize(gameInstance.getCellularAutomatonSize());
    setGame(gameInstance);
  };

  useEffect(() => {
    instantiateGame();
  }, []);

  return {
    gameIsReady: !!game,
    isRunning,
    aliveCells,
    currentTime,
    cellularAutomatonSize,
    start: () => game?.start(),
    stop: () => game?.stop(),
    createCell: (coordinate: Coordinate) => game?.createCell(coordinate),
  };
};

export default useGame;
