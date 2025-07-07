import {
  vi,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
  type Mock,
} from 'vitest';

import { ZodError } from 'zod';

import Clock from "./clock.entity";
import { ClockAlreadyStartedError, ClockAlreadyStoppedError } from './clock.errors';

describe('testing Clock start method', () => {
  let clock: Clock;
  let onTickCallbackMock: Mock;

  beforeEach(() => {
    onTickCallbackMock = vi.fn();
    clock = new Clock(onTickCallbackMock);

    vi.useFakeTimers();

    clock.start();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('testing call start with clock stopped', () => {
    it('should call tick callback after each default interval duration', () => {
      for (let lapIndex = 1; lapIndex <= 10; lapIndex++) {
        vi.advanceTimersByTime(1000);

        expect(onTickCallbackMock).toHaveBeenCalledTimes(lapIndex);
      }
    });
  });

  describe('testing call start with clock running', () => {
    it('should throw a ClockAlreadyStartedError', () => {
      expect(() => clock.start()).toThrow(ClockAlreadyStartedError);
    });
  });
});

describe('testing Clock stop method', () => {
  let clock: Clock;
  let onTickCallbackMock: Mock;

  beforeEach(() => {
    onTickCallbackMock = vi.fn();
    clock = new Clock(onTickCallbackMock);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('testing call stop with clock running', () => {
    it('should stop to call tick callback', () => {
      clock.start();

      vi.advanceTimersByTime(1000);

      clock.stop();

      vi.advanceTimersByTime(10000);

      expect(onTickCallbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('testing call stop with clock never runned', () => {
    it('should throw a ClockAlreadyStoppedError', () => {
      expect(() => clock.stop()).toThrow(ClockAlreadyStoppedError);
    });
  });

  describe('testing call stop with clock stopped', () => {
    it('should throw a ClockAlreadyStoppedError', () => {
      clock.start();
      clock.stop();

      expect(() => clock.stop()).toThrow(ClockAlreadyStoppedError);
    });
  });
});

describe('testing Clock set interval duration method', () => {
  let clock: Clock;
  let onTickCallbackMock: Mock;

  beforeEach(() => {
    onTickCallbackMock = vi.fn();
    clock = new Clock(onTickCallbackMock);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('testing to set interval duration with clock running', () => {
    beforeEach(() => {
      clock.start();
      vi.advanceTimersByTime(999);
      clock.setIntervalDuration(1500);
    });

    it('should not stop clock', () => {
      vi.advanceTimersByTime(10000);

      expect(onTickCallbackMock).toHaveBeenCalled();
    });

    it('should call tick callback after each new interval duration', () => {
      for (let lapIndex = 1; lapIndex <= 10; lapIndex++) {
        vi.advanceTimersByTime(1500);

        expect(onTickCallbackMock).toHaveBeenCalledTimes(lapIndex);
      }
    });
  });

  describe('testing to set interval duration with clock stopped', () => {
    beforeEach(() => {
      clock.setIntervalDuration(1500);
    });

    it('should not start clock', () => {
      vi.advanceTimersByTime(10000);

      expect(onTickCallbackMock).not.toHaveBeenCalled();
    });

    it('should call tick callback after each new interval duration', () => {
      clock.start();

      for (let lapIndex = 1; lapIndex <= 10; lapIndex++) {
        vi.advanceTimersByTime(1500);

        expect(onTickCallbackMock).toHaveBeenCalledTimes(lapIndex);
      }
    });
  });

  describe.each([
    ['zero value', 0],
    ['negative value', -1],
  ])('testing to set interval duration with invalid value > %s', (_: string, intervalDurationValue: number) => {
    it('should throw a zod validation error', () => {
      expect(() => clock.setIntervalDuration(intervalDurationValue)).toThrow(ZodError);
    });
  });
});

describe('testing Clock is running method', () => {
  let clock: Clock;

  beforeEach(() => {
    clock = new Clock(() => { });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true when clock is running', () => {
    clock.start();

    expect(clock.isRunning()).toBe(true);
  });

  it('should return false when clock never runned', () => {
    expect(clock.isRunning()).toBe(false);
  });

  it('should return false when clock is stopped', () => {
    clock.start();
    clock.stop();

    expect(clock.isRunning()).toBe(false);
  });
});
