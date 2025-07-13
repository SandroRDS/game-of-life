import Clock from "../clock/clock.entity";
import Timer from "../timer/timer.entity";

class Game {
  private clock: Clock;
  private timer: Timer;
  private updateUiStatesCallback: (game: Game) => void;

  public constructor(updateUiStatesCallback: (game: Game) => void) {
    this.updateUiStatesCallback = updateUiStatesCallback;

    this.clock = new Clock(() => {
      this.loop();
      this.updateUiStatesCallback(this);
    });

    this.timer = new Timer();
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
