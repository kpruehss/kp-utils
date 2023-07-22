/* eslint-disable no-unused-vars */
export class Either {
  static left(value) {
    return new Left(value);
  }

  static right(value) {
    return new Right(value);
  }

  static of(value) {
    return new Right(value);
  }

  static fromPredicate(predicate) {
    return function (value) {
      return predicate(value) ? Right.of(value) : Left.of(value);
    };
  }

  map() {
    throw new Error('Method "map" should be implemented');
  }

  ap() {
    throw new Error('Method "ap" should be implemented');
  }

  chain() {
    throw new Error('Method "chain" should be implemented');
  }

  tap() {
    throw new Error('Method "tap" should be implemented');
  }

  fold() {
    throw new Error('Method "fold" should be implemented');
  }

  isLeft() {
    throw new Error('Method "isLeft" should be implemented');
  }

  isRight() {
    throw new Error('Method "isRight" should be implemented');
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
