/**
 * Represents a value that may or may not exist.
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
  static Just(value) {
    return new Just(value);
  }

  /**
   * Creates a new Maybe instance with no value.
   * @static
   * @returns {Nothing} A new Nothing instance.
   * @example
   * const maybe = Maybe.Nothing();
   */
  static Nothing() {
    return new Nothing();
  }

  /**
   * Creates a new Maybe instance from a nullable value.
   * @static
   * @param {*} value - The value to wrap in a Maybe.
   * @returns {Just|Nothing} A new Just instance with the given value if it is not null or undefined, otherwise a new Nothing instance.
   * @example
   * const maybe1 = Maybe.fromNullable(null); // returns Nothing
   * const maybe2 = Maybe.fromNullable(42); // returns Just(42)
   */
  static fromNullable(value) {
    return value != null ? Maybe.Just(value) : Maybe.Nothing();
  }
}

/**
 * Represents a Maybe instance with a value.
 * @class
 */
export class Just {
  /**
   * Creates a new Just instance with a value transformed by a function.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Just} A new Just instance with the transformed value.
   * @example
   * const maybe1 = Maybe.Just(42);
   * const maybe2 = maybe1.map(x => x + 1); // returns Just(43)
   * ------------------------------------------------------------
   * or using other unary functions:
   * const increment = x => x + 1;
   * const maybe3 = maybe1.map(increment); // returns Just(43)
   *
   */
  map(fn) {
    return Maybe.Just(fn(this._value));
  }

  /**
   * Applies a function to the value and returns the result.
   * @param {Function} fn - The function to apply to the value.
   * @returns {*} The result of applying the function to the value.
   * @example
   * const maybe1 = Maybe.Just(42);
   * const result = maybe1.chain(x => Maybe.Just(x + 1)); // returns 43
   */
  chain(fn) {
    return fn(this._value);
  }

  /**
   * Applies a Maybe instance with a function to this instance and returns the result. This can be used when a function needs to be applied to multiple Maybe instances.
   * @param {Maybe} something - The Maybe instance with a function to apply to this instance.
   * @returns {Maybe} The result of applying the function to this instance.
   * @example
   * const maybe1 = Maybe.Just(42);
   * const maybe2 = Maybe.Just(x => x + 1);
   * const result = maybe1.ap(maybe2); // returns Just(43)
   */
  ap(something) {
    return something.map(this._value);
  }

  /**
   * Returns the value of this instance.
   * @returns {*} The value of this instance.
   * @example
   * const maybe = Maybe.Just(42);
   * const value = maybe.getOrElse(); // returns 42
   *
   * const nothing = Maybe.Nothing();
   * const result = nothing.getOrElse("No value"); // result is "No value"
   */
  getOrElse() {
    return this._value;
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
    fn(this._value);
    return this;
  }
}

/**
 * Represents a Maybe instance with no value.
 * @class
 */
export class Nothing {
  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Nothing} This instance.
   * @example
   * const maybe = Maybe.Nothing();
   * const result = maybe.map(x => x + 1); // returns Nothing
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
   * Returns the given value, indicating that this instance has no value.
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
