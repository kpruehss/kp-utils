import { Maybe, Some, None } from './maybe';
describe('Maybe', () => {
  describe('Some', () => {
    test('returns a new "Some" instance with the given value', () => {
      const maybeNum = Maybe.some(42);
      expect(maybeNum).toBeInstanceOf(Some);
      expect(maybeNum.isSome()).toBe(true);
      expect(maybeNum.isNone()).toBe(false);
      expect(maybeNum.getOrElse()).toBe(42);
    });
  });

  describe('None', () => {
    test('returns a new "None" instance', () => {
      const maybe = Maybe.none();
      expect(maybe).toBeInstanceOf(None);
      expect(maybe.isNone()).toBe(true);
      expect(maybe.isSome()).toBe(false);
    });
  });

  describe('fromNullable', () => {
    test('returns a new "Some" instance with the given value if it is not null or undefined', () => {
      const maybeNum = Maybe.fromNullable(42);
      expect(maybeNum).toBeInstanceOf(Some);
      expect(maybeNum.isSome()).toBe(true);
      expect(maybeNum.isNone()).toBe(false);
      expect(maybeNum.getOrElse()).toBe(42);
    });

    test('returns a new "None" instance if the given value is null', () => {
      const maybeNull = Maybe.fromNullable(null);
      expect(maybeNull).toBeInstanceOf(None);
      expect(maybeNull.isNone()).toBe(true);
      expect(maybeNull.isSome()).toBe(false);
    });

    test('returns a new "None" instance if the given value is undefined', () => {
      const maybeUndefined = Maybe.fromNullable(undefined);
      expect(maybeUndefined).toBeInstanceOf(None);
      expect(maybeUndefined.isNone()).toBe(true);
      expect(maybeUndefined.isSome()).toBe(false);
    });
  });

  describe('Some', () => {
    let maybeNum;

    beforeEach(() => {
      maybeNum = Maybe.some(42);
    });

    describe('map', () => {
      test('returns a new "Some" instance with the transformed value', () => {
        const maybeNumPlusOne = maybeNum.map(x => x + 1);
        expect(maybeNumPlusOne).toBeInstanceOf(Some);
        expect(maybeNumPlusOne.isSome()).toBe(true);
        expect(maybeNumPlusOne.isNone()).toBe(false);
        expect(maybeNumPlusOne.getOrElse()).toBe(43);
      });
    });

    describe('chain', () => {
      test('applies a function to the value and returns the result', () => {
        const result = maybeNum.chain(x => Maybe.some(x + 1));
        expect(result.getOrElse()).toBe(43);
        expect(result).toBeInstanceOf(Some);
        expect(result.isSome()).toBe(true);
        expect(result.isNone()).toBe(false);
      });
    });

    describe('ap', () => {
      test('applies a Maybe instance with a function to this instance and returns the result', () => {
        const maybeFn = Maybe.some(x => x + 1);
        const result = maybeFn.ap(maybeNum);
        expect(result).toBeInstanceOf(Some);
        expect(result.isSome()).toBe(true);
        expect(result.isNone()).toBe(false);
        expect(result.getOrElse()).toBe(43);
      });
    });

    describe('getOrElse', () => {
      test('returns the value of this instance', () => {
        const value = maybeNum.getOrElse('Some other value');
        expect(value).toBe(42);
      });
    });
    describe('fold', () => {
      test('applies the "Some" function to the value and returns the result', () => {
        const maybeNum = Maybe.some(42);
        const result = maybeNum.fold(
          () => 'No value',
          x => x + 1,
        );
        expect(result).toBe(43);
      });
    });

    describe('isNone', () => {
      test('returns false', () => {
        expect(maybeNum.isSome()).toBe(true);
        expect(maybeNum.isNone()).toBe(false);
      });
    });

    describe('tap', () => {
      test('applies a function to the value as a side-effect and returns this instance', () => {
        const spy = jest.fn();
        const result = maybeNum.tap(spy);
        expect(spy).toHaveBeenCalledWith(42);
        expect(result).toBeInstanceOf(Some);
        expect(result.isSome()).toBe(true);
        expect(result.isNone()).toBe(false);
        expect(result.getOrElse()).toBe(42);
      });
    });
  });

  describe('None', () => {
    let maybe;

    beforeEach(() => {
      maybe = Maybe.none();
    });

    describe('map', () => {
      test('returns this instance', () => {
        const result = maybe.map(x => x + 1);
        expect(result).toBeInstanceOf(None);
        expect(result.isNone()).toBe(true);
        expect(result.isSome()).toBe(false);
        expect(result).toEqual({ _tag: 'None' });
      });
    });

    describe('chain', () => {
      test('returns this instance', () => {
        const result = maybe.chain(x => Maybe.some(x + 1));
        expect(result).toBeInstanceOf(None);
        expect(result.isNone()).toBe(true);
        expect(result.isSome()).toBe(false);
        expect(result).toEqual({ _tag: 'None' });
      });
    });

    describe('ap', () => {
      test('returns this instance', () => {
        const maybeFn = Maybe.some(x => x + 1);
        const result = maybe.ap(maybeFn);
        expect(result).toBeInstanceOf(None);
        expect(result.isNone()).toBe(true);
        expect(result.isSome()).toBe(false);
        expect(result).toEqual({ _tag: 'None' });
      });
    });

    describe('getOrElse', () => {
      test('returns the given value', () => {
        const value = maybe.getOrElse(42);
        expect(value).toBe(42);
      });
    });
    describe('fold', () => {
      test('applies the "None" function and returns its result', () => {
        const maybeNothing = Maybe.none();
        const result = maybeNothing.fold(
          () => 'No value',
          x => x + 1,
        );
        expect(result).toBe('No value');
      });
    });

    describe('isNone', () => {
      test('returns true', () => {
        expect(maybe.isNone()).toBe(true);
        expect(maybe.isSome()).toBe(false);
        expect(maybe).toEqual({ _tag: 'None' });
      });
    });

    describe('tap', () => {
      test('returns this instance', () => {
        const spy = jest.fn();
        const result = maybe.tap(spy);
        expect(spy).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(None);
        expect(result.isNone()).toBe(true);
        expect(result.isSome()).toBe(false);
      });
    });
  });
});
