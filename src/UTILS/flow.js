/**
 * Creates a new function that applies a series of functions to its arguments, passing the result of each function as the argument to the next function.
 * @param {...Function} fns - The functions to apply to the arguments.
 * @returns {Function} A new function that applies all the given functions to its arguments.
 * @example
 * const add = x => y => x + y;
 * const square = x => x * x;
 * const incrementAndSquare = flow(add(1), square);
 * const result = incrementAndSquare(2); // 9
 */
export const flow = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        g(f(...args)),
  );
