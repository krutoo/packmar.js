import { isDisplayedPrimitive } from '../dom.js';

describe('isDisplayedPrimitive()', () => {
  it('should return true for strings, numbers, true, symbols', () => {
    [true, 1, 0, '1', Symbol('test')].forEach(primitive => {
      expect(isDisplayedPrimitive(primitive)).toBe(true);
    });
  });
  it('should return false for null, false, undefined', () => {
    [false, null, undefined].forEach(primitive => {
      expect(isDisplayedPrimitive(primitive)).toBe(false);
    });
  });
  it('should return false for non primitives', () => {
    [{}, [], Function, /test/g].forEach(value => {
      expect(isDisplayedPrimitive(value)).toBe(false);
    });
  });
});
