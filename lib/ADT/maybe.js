"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nothing = exports.Maybe = exports.Just = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Represents a value that may or may not exist.
 * @class
 */
var Maybe = /*#__PURE__*/function () {
  function Maybe() {
    _classCallCheck(this, Maybe);
  }
  _createClass(Maybe, null, [{
    key: "Just",
    value:
    /**
     * Creates a new Maybe instance with a value.
     * @static
     * @param {*} value - The value to wrap in a Maybe.
     * @returns {Just} A new Just instance with the given value.
     * @example
     * const maybeNum = Maybe.Just(42);
     */
    function Just(value) {
      return new _Just(value);
    }

    /**
     * Creates a new Maybe instance with no value.
     * @static
     * @returns {Nothing} A new Nothing instance.
     * @example
     * const maybe = Maybe.Nothing();
     */
  }, {
    key: "Nothing",
    value: function Nothing() {
      return new _Nothing();
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
  }, {
    key: "fromNullable",
    value: function fromNullable(value) {
      return value != null ? Maybe.Just(value) : Maybe.Nothing();
    }
  }]);
  return Maybe;
}();
/**
 * Represents a Maybe instance with a value.
 * @class
 */
exports.Maybe = Maybe;
var _Just = /*#__PURE__*/function () {
  function _Just() {
    _classCallCheck(this, _Just);
  }
  _createClass(_Just, [{
    key: "map",
    value:
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
    function map(fn) {
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
  }, {
    key: "chain",
    value: function chain(fn) {
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
  }, {
    key: "ap",
    value: function ap(something) {
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
  }, {
    key: "getOrElse",
    value: function getOrElse() {
      return this._value;
    }

    /**
     * Returns false, indicating that this instance is not a Nothing instance.
     * @returns {boolean} False.
     * @example
     * const maybe = Maybe.Just(42);
     * const isNothing = maybe.isNothing(); // returns false
     */
  }, {
    key: "isNothing",
    value: function isNothing() {
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
  }, {
    key: "tap",
    value: function tap(fn) {
      fn(this._value);
      return this;
    }
  }]);
  return _Just;
}();
/**
 * Represents a Maybe instance with no value.
 * @class
 */
exports.Just = _Just;
var _Nothing = /*#__PURE__*/function () {
  function _Nothing() {
    _classCallCheck(this, _Nothing);
  }
  _createClass(_Nothing, [{
    key: "map",
    value:
    /**
     * Returns this instance, indicating that no function should be applied to it.
     * @param {Function} fn - The function to apply to the value.
     * @returns {Nothing} This instance.
     * @example
     * const maybe = Maybe.Nothing();
     * const result = maybe.map(x => x + 1); // returns Nothing
     */
    function map(fn) {
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
  }, {
    key: "chain",
    value: function chain(fn) {
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
  }, {
    key: "ap",
    value: function ap(something) {
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
  }, {
    key: "getOrElse",
    value: function getOrElse(other) {
      return other;
    }

    /**
     * Returns true, indicating that this instance is a Nothing instance.
     * @returns {boolean} True.
     * @example
     * const maybe = Maybe.Nothing();
     * const isNothing = maybe.isNothing(); // returns true
     */
  }, {
    key: "isNothing",
    value: function isNothing() {
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
  }, {
    key: "tap",
    value: function tap(fn) {
      return this;
    }
  }]);
  return _Nothing;
}();
exports.Nothing = _Nothing;