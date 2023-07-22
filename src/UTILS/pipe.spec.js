import { pipe } from '../UTILS';
describe('pipe', () => {
  test('applies a series of functions to an initial value', () => {
    const add = x => y => x + y;
    const square = x => x * x;
    const incrementAndSquare = pipe(2, add(1), square);
    expect(incrementAndSquare).toBe(9);
  });

  test('returns the initial value if no functions are provided', () => {
    const result = pipe(42);
    expect(result).toBe(42);
  });

  test('applies functions in the order they are provided', () => {
    const add = x => y => x + y;
    const square = x => x * x;
    const incrementAndSquare = pipe(2, square, add(1));
    expect(incrementAndSquare).toBe(5);
  });
});
