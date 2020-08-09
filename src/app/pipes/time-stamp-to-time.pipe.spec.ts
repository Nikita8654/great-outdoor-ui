import { TimeStampToTimePipe } from './time-stamp-to-time.pipe';

describe('TimeStampToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeStampToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
