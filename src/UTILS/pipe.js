/**
 * Applies a series of functions to an initial value, passing the result of each function as the argument to the next function.
 * @param {*} initialValue - The initial value to pass to the first function.
 * @param {...Function} fns - The functions to apply to the initial value.
 * @returns {*} The final result of applying all the functions to the initial value.
 * @example
 * const add = x => y => x + y;
 * const square = x => x * x;
 * const incrementAndSquare = pipe(2, add(1), square);
 * const result = incrementAndSquare; // 9
 */
export const pipe = (initialValue, ...fns) =>
  fns.reduce((previousValue, fn) => fn(previousValue), initialValue);
