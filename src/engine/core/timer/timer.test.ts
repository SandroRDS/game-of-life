import {
  describe,
  it,
  beforeEach,
  expect,
} from 'vitest';
import Timer from './timer.entity';
import type { TimeSnapshot } from './timer.types';

describe('testing Timer', () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });

  describe.each([
    [0, { hours: 0, minutes: 0, seconds: 0 }],
    [59, { hours: 0, minutes: 0, seconds: 59 }],
    [60, { hours: 0, minutes: 1, seconds: 0 }],
    [119, { hours: 0, minutes: 1, seconds: 59 }],
    [120, { hours: 0, minutes: 2, seconds: 0 }],
    [3599, { hours: 0, minutes: 59, seconds: 59 }],
    [3600, { hours: 1, minutes: 0, seconds: 0 }],
    [7199, { hours: 1, minutes: 59, seconds: 59 }],
    [7200, { hours: 2, minutes: 0, seconds: 0 }],
    [216000, { hours: 60, minutes: 0, seconds: 0 }],
  ])('testing to get the current time correctly after advancing the time %s times', (iterationTimes: number, expectedTime: TimeSnapshot) => {
    it('should return correct time', function () {
      for (let i = 1; i <= iterationTimes; i++) {
        timer.advanceTime();
      }

      expect(timer.getCurrentTime()).toEqual(expectedTime);
    });
  });
});
