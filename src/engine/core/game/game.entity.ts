import DEFAULT_CELLULAR_AUTOMATON_LENGTH from '@src/common/consts/defaultCellularAutomatonLength';
import Clock from '../clock/clock.entity';
import CellularAutomaton from '../entities/cellularAutomaton/cellularAutomaton.entity';
import Timer from '../timer/timer.entity';

class Game {
  private clock: Clock;
  private timer: Timer;
  private cellularAutomaton: CellularAutomaton;
  private updateUiStatesCallback: (game: Game) => void;

  public constructor(updateUiStatesCallback: (game: Game) => void) {
    this.updateUiStatesCallback = updateUiStatesCallback;

    this.timer = new Timer();

    this.cellularAutomaton = new CellularAutomaton({
      horizontalLength: DEFAULT_CELLULAR_AUTOMATON_LENGTH.horizontal,
      verticalLength: DEFAULT_CELLULAR_AUTOMATON_LENGTH.vertical,
    });

    this.clock = new Clock(() => {
      this.loop();
      this.updateUiStatesCallback(this);
    });
  }

  public start() {
    this.clock.start();
    this.updateUiStatesCallback(this);
  }

  public stop() {
    this.clock.stop();
    this.updateUiStatesCallback(this);
  }

  public isRunning() {
    return this.clock.isRunning();
  }

  public getCurrentTime() {
    return this.timer.getCurrentTime();
  }

  private loop() {
    this.timer.advanceTime();
  }
}

export default Game;
