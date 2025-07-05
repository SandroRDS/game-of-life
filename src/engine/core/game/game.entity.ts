import Clock from "../clock/clock.entity";

class Game {
  private clock: Clock;

  public constructor() {
    this.clock = new Clock(this.loop);
  }

  public start() {
    this.clock.start();
  }

  public stop() {
    this.clock.stop();
  }

  private loop() {

  }
}

export default Game;
