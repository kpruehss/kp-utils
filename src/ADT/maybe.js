/* eslint-disable no-unused-vars */
/**
 * Wraps a value that may or may not exist. This is useful for avoiding null checks and for chaining operations that may return null.
 * @class
 */
export class Maybe {
  /**
   * Creates a new Maybe instance with a value.
   * @static
   * @param {*} value - The value to wrap in a Maybe.
   * @returns {Just} A new Just instance with the given value.
   * @example
   * const maybeNum = Maybe.Just(42);
   */
  static just(value) {
    return new Just(value);
  }

  /**
   * Creates a new Maybe instance with no value.
   * @static
   * @returns {Nothing} A new Nothing instance.
   * @example
   * const maybe = Maybe.Nothing();
   */
  static nothing() {
    return new Nothing();
  }

  /**
   * Creates a new Maybe instance from a nullable value. If the value is null or undefined, a new Nothing instance is returned. Otherwise, a new Just instance is returned.
   * @static
   * @param {*} value - The value to wrap in a Maybe.
   * @returns {Just|Nothing} A new Just instance with the given value if it is not null or undefined, otherwise a new Nothing instance.
   * @example
   * const maybe1 = Maybe.of(null); // returns Nothing
   * const maybe2 = Maybe.of(42); // returns Just(42)
   */
  static fromNullable(value) {
    return value !== null && value !== undefined
      ? Maybe.just(value)
      : Maybe.nothing();
  }
  get isNothing() {
    throw new Error("Method 'isNothing' should be implemented");
  }

  get isJust() {
    throw new Error("Method 'isJust' should be implemented");
  }

  ap(maybe) {
    throw new Error("Method 'ap' should be implemented");
  }

  map() {
    throw new Error("Method 'map' should be implemented");
  }

  chain() {
    throw new Error("Method 'chain' should be implemented");
  }

  fold() {
    throw new Error("Method 'fold' should be implemented");
  }

  tap() {
    throw new Error("Method 'tap' should be implemented");
  }

  getOrElse() {
    throw new Error("Method 'getOrElse' should be implemented");
  }
}

/**
 * Represents a Maybe instance with a value.
 * @class
 */
export class Just extends Maybe {
  #value;
  _tag = 'Just';
  /**
   * Creates a new Maybe instance with the given value. This constructor should not be called directly. Instead, use Maybe's static 'Just' method.
   * @class
   * @param {*} value - The value to wrap in a Maybe instance.
   * @example
   * const maybeNum = new Maybe.Just(42);
   * const maybeStr = new Maybe.Just("hello");
   */
  constructor(value) {
    super();
    this.#value = value;
  }
  /**
   * Creates a new Just instance with a value transformed by a function.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Just} A new Just instance with the transformed value.
   * @example
   * const maybe1 = Maybe.Just(42);
   * const maybe2 = maybe1.map(x => x + 1); // returns Just(43)
   * ------------------------------------------------------------
   * or using unary functions:
   * const increment = x => x + 1;
   * const maybe3 = maybe1.map(increment); // returns Just(43)
   */
  map(fn) {
    return Maybe.just(fn(this.#value));
  }

  /**
   * Applies a function to the value and returns the result. This can be used when a function needs to be applied to multiple Maybe instances. Behaves as flatMap
   * @param {Function} fn - The function to apply to the value.
   * @returns {*} a flatMapped instance of Just wrapping the transformed value.
   * @example
   * const maybe1 = Maybe.Just(42);
   * const result = maybe1.chain(x => Maybe.Just(x + 1));

   * Here, result will be an instance of Just with a value of 43 instead of an instance of Just with a value of Just(43) if we had used map instead.
   */
  chain(fn) {
    return fn(this.#value);
  }

  /**
   * Applies a Maybe instance with a function to this instance and returns the result. This can be used when a function needs to be applied to multiple Maybe instances. Useful for things like applying validation to multiple Maybe instances.
   * @param {Maybe} something - The Maybe instance with a function to apply to this instance.
   * @returns {Maybe} The result of applying the function to this instance.
   * @example
   * const maybe1 = Maybe.Just(42);
   * const maybe2 = Maybe.Just(x => x + 1);
   * const result = maybe2.ap(maybe1); // returns Just(43)
   */
  ap(something) {
    return something.map(this.#value);
  }

  /**
   * Returns the value of this instance. Similar to Fold, but takes a fallback value to return if this instance is a Nothing.
   * @returns {*} The value of this instance.
   * @example
   * const maybe = Maybe.Just(42);
   * const value = maybe.getOrElse(); // returns 42
   *
   * const nothing = Maybe.Nothing();
   * const result = nothing.getOrElse("No value"); // result is "No value"
   */
  getOrElse() {
    return this.#value;
  }

  /**
   * Applies one of two functions to the value of this instance and returns the result.
   * @param {Function} f - The function to apply if this instance is a Nothing.
   * @param {Function} g - The function to apply if this instance is a Just.
   * @returns {*} The result of applying the appropriate function to the value of this instance.
   * @example
   * const maybeNum = Maybe.Just(42);
   * const result1 = maybeNum.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result1 is 43
   *
   * const maybeNothing = Maybe.Nothing();
   * const result2 = maybeNothing.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result2 is "No value"
   */
  fold(f, g) {
    return g(this.#value);
  }

  /**
   * Returns false, indicating that this instance is not a Nothing instance.
   * @returns {boolean} False.
   * @example
   * const maybe = Maybe.Just(42);
   * const isNothing = maybe.isNothing(); // returns false
   */
  isNothing() {
    return false;
  }

  /**
   * Applies a function to the value as a side-effect and returns this instance.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Just} This instance.
   * @example
   * const maybe = Maybe.Just(42);
   * maybe.tap(x => console.log(x)); // logs 42
   * maybe.tap(console.log); // (point-free style) logs 42
   */
  tap(fn) {
    fn(this.#value);
    return this;
  }
}

/**
 * Represents a Maybe instance with no value.
 * @class
 */
export class Nothing {
  _tag = 'Nothing';
  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Nothing} This instance.
   * @example
   * const maybe = Maybe.Nothing();
   * const result = maybe.map(x => x + 1); // returns Nothing, short-circuiting the function and any subsequent operations
   */
  map(fn) {
    return this;
  }

  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Nothing} This instance.
   * @example
   * const maybe = Maybe.Nothing();
   * const result = maybe.chain(x => Maybe.Just(x + 1)); // returns Nothing
   */
  chain(fn) {
    return this;
  }

  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Maybe} something - The Maybe instance with a function to apply to this instance.
   * @returns {Nothing} This instance.
   * @example
   * const maybe1 = Maybe.Nothing();
   * const maybe2 = Maybe.Just(x => x + 1);
   * const result = maybe1.ap(maybe2); // returns Nothing
   */
  ap(something) {
    return this;
  }

  /**
   * Returns the given fallback value
   * @param {*} other - The value to return. (The 'Else' in getOrElse)
   * @returns {*} The given value.
   * @example
   * const maybe = Maybe.Nothing();
   * const value = maybe.getOrElse(42); // returns 42
   */
  getOrElse(other) {
    return other;
  }

  /**
   * Applies one of two functions to the value of this instance and returns the result.
   * @param {Function} f - The function to apply if this instance is a Nothing.
   * @param {Function} g - The function to apply if this instance is a Just.
   * @returns {*} The result of applying the appropriate function to the value of this instance.
   * @example
   * const maybeNum = Maybe.Just(42);
   * const result1 = maybeNum.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result1 is 43
   *
   * const maybeNothing = Maybe.Nothing();
   * const result2 = maybeNothing.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result2 is "No value"
   */
  fold(f, g) {
    return f();
  }

  /**
   * Returns true, indicating that this instance is a Nothing instance.
   * @returns {boolean} True.
   * @example
   * const maybe = Maybe.Nothing();
   * const isNothing = maybe.isNothing(); // returns true
   */
  isNothing() {
    return true;
  }

  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Nothing} This instance.
   * @example
   * const maybe = Maybe.Nothing();
   * maybe.tap(x => console.log(x)); // does not log anything
   * maybe.tap(console.log); // (point-free style) does not log anything
   */
  tap(fn) {
    return this;
  }
}
