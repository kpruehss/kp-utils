import { Maybe, Just, Nothing } from './maybe';
describe('Maybe', () => {
  describe('Just', () => {
    test('returns a new Just instance with the given value', () => {
      const maybeNum = Maybe.just(42);
      expect(maybeNum).toBeInstanceOf(Just);
      console.log(maybeNum);
      expect(maybeNum.getOrElse()).toBe(42);
    });
  });

  describe('Nothing', () => {
    test('returns a new Nothing instance', () => {
      const maybe = Maybe.nothing();
      expect(maybe).toBeInstanceOf(Nothing);
      expect(maybe.isNothing()).toBe(true);
    });
  });

  describe('fromNullable', () => {
    test('returns a new Just instance with the given value if it is not null or undefined', () => {
      const maybeNum = Maybe.fromNullable(42);
      expect(maybeNum).toBeInstanceOf(Just);
      expect(maybeNum.getOrElse()).toBe(42);
    });

    test('returns a new Nothing instance if the given value is null', () => {
      const maybeNull = Maybe.fromNullable(null);
      expect(maybeNull).toBeInstanceOf(Nothing);
      expect(maybeNull.isNothing()).toBe(true);
    });

    test('returns a new Nothing instance if the given value is undefined', () => {
      const maybeUndefined = Maybe.fromNullable(undefined);
      expect(maybeUndefined).toBeInstanceOf(Nothing);
      expect(maybeUndefined.isNothing()).toBe(true);
    });
  });

  describe('Just', () => {
    let maybeNum;

    beforeEach(() => {
      maybeNum = Maybe.just(42);
    });

    describe('map', () => {
      test('returns a new Just instance with the transformed value', () => {
        const maybeNumPlusOne = maybeNum.map(x => x + 1);
        expect(maybeNumPlusOne).toBeInstanceOf(Just);
        expect(maybeNumPlusOne.getOrElse()).toBe(43);
      });
    });

    describe('chain', () => {
      test('applies a function to the value and returns the result', () => {
        const result = maybeNum.chain(x => Maybe.just(x + 1));
        expect(result.getOrElse()).toBe(43);
      });
    });

    describe('ap', () => {
      test('applies a Maybe instance with a function to this instance and returns the result', () => {
        const maybeFn = Maybe.just(x => x + 1);
        const result = maybeFn.ap(maybeNum);
        expect(result).toBeInstanceOf(Just);
        expect(result.getOrElse()).toBe(43);
      });
    });

    describe('getOrElse', () => {
      test('returns the value of this instance', () => {
        const value = maybeNum.getOrElse();
        expect(value).toBe(42);
      });
    });
    describe('fold', () => {
      test('applies the "Just" function to the value and returns the result', () => {
        const maybeNum = Maybe.just(42);
        const result = maybeNum.fold(
          () => 'No value',
          x => x + 1,
        );
        expect(result).toBe(43);
      });
    });

    describe('isNothing', () => {
      test('returns false', () => {
        expect(maybeNum.isNothing()).toBe(false);
      });
    });

    describe('tap', () => {
      test('applies a function to the value as a side-effect and returns this instance', () => {
        const spy = jest.fn();
        const result = maybeNum.tap(spy);
        expect(spy).toHaveBeenCalledWith(42);
        expect(result).toBeInstanceOf(Just);
        expect(result.getOrElse()).toBe(42);
      });
    });
  });

  describe('Nothing', () => {
    let maybe;

    beforeEach(() => {
      maybe = Maybe.nothing();
    });

    describe('map', () => {
      test('returns this instance', () => {
        const result = maybe.map(x => x + 1);
        expect(result).toBeInstanceOf(Nothing);
        expect(result.isNothing()).toBe(true);
        expect(result).toEqual({ _tag: 'Nothing' });
      });
    });

    describe('chain', () => {
      test('returns this instance', () => {
        const result = maybe.chain(x => Maybe.just(x + 1));
        expect(result).toBeInstanceOf(Nothing);
        expect(result.isNothing()).toBe(true);
        expect(result).toEqual({ _tag: 'Nothing' });
      });
    });

    describe('ap', () => {
      test('returns this instance', () => {
        const maybeFn = Maybe.just(x => x + 1);
        const result = maybe.ap(maybeFn);
        expect(result).toBeInstanceOf(Nothing);
        expect(result.isNothing()).toBe(true);
        expect(result).toEqual({ _tag: 'Nothing' });
      });
    });

    describe('getOrElse', () => {
      test('returns the given value', () => {
        const value = maybe.getOrElse(42);
        expect(value).toBe(42);
      });
    });
    describe('fold', () => {
      test('applies the "Nothing" function and returns its result', () => {
        const maybeNothing = Maybe.nothing();
        const result = maybeNothing.fold(
          () => 'No value',
          x => x + 1,
        );
        expect(result).toBe('No value');
      });
    });

    describe('isNothing', () => {
      test('returns true', () => {
        expect(maybe.isNothing()).toBe(true);
        expect(maybe).toEqual({ _tag: 'Nothing' });
      });
    });

    describe('tap', () => {
      test('returns this instance', () => {
        const spy = jest.fn();
        const result = maybe.tap(spy);
        expect(spy).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Nothing);
        expect(result.isNothing()).toBe(true);
      });
    });
  });
});
