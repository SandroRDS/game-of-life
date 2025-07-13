import type { TimeSnapshot } from './timer.types';

class Timer {
  private hours: number = 0;
  private minutes: number = 0;
  private seconds: number = 0;

  public getCurrentTime(): TimeSnapshot {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }

  public advanceTime() {
    this.seconds++;

    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;

      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
  }
}

export default Timer;
