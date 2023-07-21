export class Maybe {
  static Just(value) {
    return new Just(value);
  }

  static Nothing() {
    return new Nothing();
  }

  static fromNullable(value) {
    return value != null ? Maybe.Just(value) : Maybe.Nothing();
  }
}

export class Just {
  constructor(value) {
    this._value = value;
  }

  map(f) {
    return Maybe.Just(f(this._value));
  }

  chain(f) {
    return f(this._value);
  }

  ap(something) {
    return something.map(this._value);
  }

  getOrElse() {
    return this._value;
  }

  isNothing() {
    return false;
  }

  tap(f) {
    f(this._value);
    return this;
  }
}

export class Nothing {
  map(f) {
    return this;
  }

  chain(f) {
    return this;
  }

  ap(something) {
    return this;
  }

  getOrElse(other) {
    return other;
  }

  isNothing() {
    return true;
  }

  tap(f) {
    return this;
  }
}
