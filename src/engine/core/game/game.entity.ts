import DEFAULT_CELLULAR_AUTOMATON_LENGTH from '@src/common/consts/defaultCellularAutomatonLength';
import Clock from '../clock/clock.entity';
import CellularAutomaton from '../entities/cellularAutomaton/cellularAutomaton.entity';
import Timer from '../timer/timer.entity';
import type { Coordinate } from '@src/common/types/coordinate';

class Game {
  private clock: Clock;
  private timer: Timer;
  private cellularAutomaton: CellularAutomaton;
  private updateUiStatesCallback: () => void;

  public constructor(updateUiStatesCallback: (game: Game) => void) {
    this.updateUiStatesCallback = () => updateUiStatesCallback(this);

    this.timer = new Timer();

    this.cellularAutomaton = new CellularAutomaton({
      horizontal: DEFAULT_CELLULAR_AUTOMATON_LENGTH.horizontal,
      vertical: DEFAULT_CELLULAR_AUTOMATON_LENGTH.vertical,
    });

    this.clock = new Clock(() => this.loop());
  }

  public start() {
    this.clock.start();
    this.updateUiStatesCallback();
  }

  public stop() {
    this.clock.stop();
    this.updateUiStatesCallback();
  }

  public isRunning() {
    return this.clock.isRunning();
  }

  public getCurrentTime() {
    return this.timer.getCurrentTime();
  }

  public createCell(coordinate: Coordinate) {
    this.cellularAutomaton.createCell(coordinate);
    this.updateUiStatesCallback();
  }

  public getAliveCellsCoordinates() {
    return this.cellularAutomaton.getAliveCellsCoordinates();
  }

  public getCellularAutomatonSize() {
    return this.cellularAutomaton.size;
  }

  private loop() {
    this.timer.advanceTime();
    this.cellularAutomaton.advanceToNextGeneration();
    this.updateUiStatesCallback();
  }
}

export default Game;
