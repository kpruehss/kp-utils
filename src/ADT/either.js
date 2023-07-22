/* eslint-disable no-unused-vars */
export class Either {
  static left(value) {
    return new Left(value);
  }

  static right(value) {
    return new Right(value);
  }

  static fromPredicate(predicate) {
    return function (value) {
      return predicate(value) ? Right.of(value) : Left.of(value);
    };
  }
}

export class Right extends Either {
  #value;
  _tag = 'Right';
  constructor(value) {
    super();
    this.#value = value;
  }

  of(value) {
    return new Right(value); // Return new Right with value
  }

  map(f) {
    return Either.of(f(this.#value)); // Return new Right after applying map function
  }

  chain(f) {
    return f(this.#value); // Return result of applying chain function
  }

  ap(other) {
    return other.map(this.#value); // Apply contained function to other
  }

  fold(f, g) {
    return g(this.#value); // Apply the right-side function for fold
  }

  tap(f) {
    f(this.#value); // Execute side effect with the value
    return this; // Return self for continued chaining
  }
}

export class Left extends Either {
  #value;
  _tag = 'Left';
  constructor(value) {
    super();
    this.#value = value;
  }

  of(value) {
    return new Left(value); // Return new Left with value
  }

  map() {
    return this; // Return self without altering value for mapping a Left
  }

  chain() {
    return this; // Return self without altering value for chaining a Left
  }

  ap() {
    return this; // Return self without altering value for applying a Left
  }

  fold(f, g) {
    return f(this._value); // Apply the left-side function for fold
  }

  tap() {
    return this; // Return self without altering value for tapping a Left
  }
}
