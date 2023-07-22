/* eslint-disable no-unused-vars */
/**
 * Wraps a value that may or may not exist. This is useful for avoiding null checks and for chaining operations that may return null.
 * @class
 */
export class Option {
  /**
   * Creates a new Option instance with a value.
   * @static
   * @param {*} value - The value to wrap in a Option .
   * @returns {Some} A new instance of 'Some' with the given value.
   * @example
   * const maybeNum = Option.some(42);
   */
  static some(value) {
    return new Some(value);
  }

  /**
   * Creates a new Option instance with no value.
   * @static
   * @returns {None} A new 'None' instance.
   * @example
   * const maybe = Option.none();
   */
  static none() {
    return new None();
  }

  /**
   * Creates a new Option instance from a nullable value. If the value is null or undefined, a new 'None' instance is returned. Otherwise, a new 'Some' instance is returned.
   * @static
   * @param {*} value - The value to wrap in a Option.
   * @returns {Some|None} A new 'Some' instance with the given value if it is not null or undefined, otherwise a new 'None' instance.
   * @example
   * const maybe1 = Option.fromNullable(null); // returns None
   * const maybe2 = Option.fromNullable(42); // returns Some(42)
   */
  static fromNullable(value) {
    return value !== null && value !== undefined
      ? Option.some(value)
      : Option.none();
  }
  get isNone() {
    throw new Error("Method 'isNone' should be implemented");
  }

  get isSome() {
    throw new Error("Method 'isSome' should be implemented");
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
 * Represents a  Option instance with a value.
 * @class
 */
export class Some extends Option {
  #value;
  _tag = 'Some';
  /**
   * Creates a new Option instance with the given value. This constructor should not be called directly. Instead, use Option 's static 'Some' method.
   * @class
   * @param {*} value - The value to wrap in a Option instance.
   * @example
   * const someNum = new Option.some(42);
   * const someStr = new Option.some("hello");
   */
  constructor(value) {
    super();
    this.#value = value;
  }
  /**
   * Creates a new 'Some' instance with a value transformed by a function.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Some} A new 'Some' instance with the transformed value.
   * @example
   * const maybe1 = Option.some(42);
   * const maybe2 = maybe1.map(x => x + 1); // returns Some(43)
   * ------------------------------------------------------------
   * or using unary functions:
   * const increment = x => x + 1;
   * const maybe3 = maybe1.map(increment); // returns Some(43)
   */
  map(fn) {
    return Option.some(fn(this.#value));
  }

  /**
   * Applies a function to the value and returns the result. This can be used when a function needs to be applied to multiple  Option instances. Behaves as flatMap
   * @param {Function} fn - The function to apply to the value.
   * @returns {*} a flatMapped instance of 'Some' wrapping the transformed value.
   * @example
   * const maybe1 = Option.some(42);
   * const result = maybe1.chain(x => Option.some(x + 1));

   * Here, result will be an instance of 'Some' with a value of 43 instead of an instance of 'Some' with a value of Some(43) if we had used map instead.
   */
  chain(fn) {
    return fn(this.#value);
  }

  /**
   * Applies a  Option instance with a function to this instance and returns the result. This can be used when a function, such as input validation, needs to be applied to multiple Option instances.
   * @param {Option } something - The Option instance with a function to apply to this instance.
   * @returns {Option } The result of applying the function to this instance.
   * @example
   * const maybe1 = Option.some(42);
   * const maybe2 = Option.some(x => x + 1);
   * const result = maybe2.ap(maybe1); // returns Some(43)
   */
  ap(something) {
    return something.map(this.#value);
  }

  /**
   * Returns the value of this instance. Similar to Fold, but takes a fallback value to return if this instance is a 'None'.
   * @returns {*} The value of this instance.
   * @example
   * const maybe = Option.Some(42);
   * const value = maybe.getOrElse(); // returns 42
   *
   * const nothing = Option.none();
   * const result = nothing.getOrElse("No value"); // result is "No value"
   */
  getOrElse() {
    return this.#value;
  }

  /**
   * Applies one of two functions to the value of this instance and returns the result.
   * @param {Function} f - The function to apply if this instance is a 'None'.
   * @param {Function} g - The function to apply if this instance is a 'Some'.
   * @returns {*} The result of applying the appropriate function to the value of this instance.
   * @example
   * const maybeNum = Option.some(42);
   * const result1 = maybeNum.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result1 is 43
   *
   * const maybeNothing = Option.none();
   * const result2 = maybeNothing.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result2 is "No value"
   */
  fold(f, g) {
    return g(this.#value);
  }

  /**
   * Returns false, indicating that this instance is not a 'None'.
   * @returns {boolean} False.
   * @example
   * const maybe = Option.some(42);
   * const isNone = maybe.isNone(); // returns false
   */
  isNone() {
    return false;
  }

  /**
   * Returns true, indicating that this instance is a 'Some'.
   * @returns {boolean} False.
   * @example
   * const maybe = Option.some(42);
   * const isNone = maybe.isNone(); // returns false
   */
  isSome() {
    return true;
  }

  /**
   * Applies a function to the value as a side-effect and returns this instance.
   * @param {Function} fn - The function to apply to the value.
   * @returns {Some} This instance.
   * @example
   * const maybe = Option.some(42);
   * maybe.tap(x => console.log(x)); // logs 42
   * maybe.tap(console.log); // (point-free style) logs 42
   */
  tap(fn) {
    fn(this.#value);
    return this;
  }
}

/**
 * Represents a Option instance with no value.
 * @class
 */
export class None extends Option {
  _tag = 'None';
  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {None} This instance.
   * @example
   * const maybe = Option.none();
   * const result = maybe.map(x => x + 1); // returns 'None', short-circuiting the function and any subsequent operations
   */
  map(fn) {
    return this;
  }

  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {None} This instance.
   * @example
   * const maybe = Option.none();
   * const result = maybe.chain(x => Option.some(x + 1)); // returns 'None'
   */
  chain(fn) {
    return this;
  }

  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Option} something - The Option instance with a function to apply to this instance.
   * @returns {None} This instance.
   * @example
   * const maybe1 = Option.none();
   * const maybe2 = Option.some(x => x + 1);
   * const result = maybe1.ap(maybe2); // returns 'None'
   */
  ap(something) {
    return this;
  }

  /**
   * Returns the given fallback value
   * @param {*} other - The value to return. (The 'Else' in getOrElse)
   * @returns {*} The given value.
   * @example
   * const maybeValue = Option.none();
   * const value = maybeValue.getOrElse(42); // returns 42
   */
  getOrElse(other) {
    return other;
  }

  /**
   * Applies one of two functions to the value of this instance and returns the result.
   * @param {Function} f - The function to apply if this instance is 'None'.
   * @param {Function} g - The function to apply if this instance is 'Some'.
   * @returns {*} The result of applying the appropriate function to the value of this instance.
   * @example
   * const maybeNum = Option.some(42);
   * const result1 = maybeNum.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result1 is 43
   *
   * const maybeNothing = Option.none();
   * const result2 = maybeNothing.fold(
   *   () => "No value",
   *   x => x + 1
   * ); // result2 is "No value"
   */
  fold(f, g) {
    return f();
  }

  /**
   * Returns true, indicating that this instance is a 'None'.
   * @returns {boolean} True.
   * @example
   * const maybe = Option.none();
   * const isNone = maybe.isNone(); // returns true
   */
  isNone() {
    return true;
  }

  /**
   * Returns false, indicating that this instance not a 'Some'.
   * @returns {boolean} False.
   * @example
   * const maybe = Option.none();
   * const isNone = maybe.isSome(); // returns false
   */
  isSome() {
    return false;
  }

  /**
   * Returns this instance, indicating that no function should be applied to it.
   * @param {Function} fn - The function to apply to the value.
   * @returns {None} This instance.
   * @example
   * const maybe = Option.none();
   * maybe.tap(x => console.log(x)); // does not log anything
   * maybe.tap(console.log); // (point-free style) does not log anything
   */
  tap(fn) {
    return this;
  }
}
