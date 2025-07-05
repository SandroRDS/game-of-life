export class ClockAlreadyStartedError extends Error {
  constructor() {
    super('The clock is already running.');
  }
}

export class ClockAlreadyStoppedError extends Error {
  constructor() {
    super('The clock is already stopped.');
  }
}