import { ClockAlreadyStartedError, ClockAlreadyStoppedError } from './clock.errors';
import { intervalDurationSchema } from './clock.schemas';

class Clock {
  private static readonly DEFAULT_INTERVAL_DURATION = 1000;

  private intervalId?: ReturnType<typeof setInterval>;
  private intervalDuration: number = Clock.DEFAULT_INTERVAL_DURATION;
  private onTickCallback: () => void;

  public constructor(onTick: () => void) {
    this.onTickCallback = onTick;
  }

  public start() {
    if (this.isRunning()) throw new ClockAlreadyStartedError();

    this.intervalId = setInterval(this.onTickCallback, this.intervalDuration);
  }

  public stop() {
    if (!this.isRunning()) throw new ClockAlreadyStoppedError();

    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  public setIntervalDuration(intervalDurationInMs: number) {
    const validatedIntervalDuration = intervalDurationSchema.parse(intervalDurationInMs);

    if (this.isRunning()) {
      this.stop();
      this.intervalDuration = validatedIntervalDuration;
      this.start();
    } else {
      this.intervalDuration = validatedIntervalDuration;
    }
  }

  public isRunning() {
    return !!this.intervalId;
  }
}

export default Clock;
