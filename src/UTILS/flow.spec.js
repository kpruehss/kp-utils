import { flow } from '../UTILS';
describe('flow', () => {
  test('applies a series of functions to its arguments', () => {
    const add = x => y => x + y;
    const square = x => x * x;
    const incrementAndSquare = flow(add(1), square);
    expect(incrementAndSquare(2)).toBe(9);
  });

  test('applies functions in the order they are provided', () => {
    const add = x => y => x + y;
    const square = x => x * x;
    const incrementAndSquare = flow(square, add(1));
    expect(incrementAndSquare(2)).toBe(5);
  });
});
