"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nothing = exports.Maybe = exports.Just = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-unused-vars */
/**
 * Wraps a value that may or may not exist. This is useful for avoiding null checks and for chaining operations that may return null.
 * @class
 */
var Maybe = /*#__PURE__*/function () {
  function Maybe() {
    _classCallCheck(this, Maybe);
  }
  _createClass(Maybe, [{
    key: "isNothing",
    get: function get() {
      throw new Error("Method 'isNothing' should be implemented");
    }
  }, {
    key: "isJust",
    get: function get() {
      throw new Error("Method 'isJust' should be implemented");
    }
  }, {
    key: "ap",
    value: function ap(maybe) {
      throw new Error("Method 'ap' should be implemented");
    }
  }, {
    key: "map",
    value: function map() {
      throw new Error("Method 'map' should be implemented");
    }
  }, {
    key: "chain",
    value: function chain() {
      throw new Error("Method 'chain' should be implemented");
    }
  }, {
    key: "fold",
    value: function fold() {
      throw new Error("Method 'fold' should be implemented");
    }
  }, {
    key: "tap",
    value: function tap() {
      throw new Error("Method 'tap' should be implemented");
    }
  }, {
    key: "getOrElse",
    value: function getOrElse() {
      throw new Error("Method 'getOrElse' should be implemented");
    }
  }], [{
    key: "just",
    value:
    /**
     * Creates a new Maybe instance with a value.
     * @static
     * @param {*} value - The value to wrap in a Maybe.
     * @returns {Just} A new Just instance with the given value.
     * @example
     * const maybeNum = Maybe.Just(42);
     */
    function just(value) {
      return new Just(value);
    }

    /**
     * Creates a new Maybe instance with no value.
     * @static
     * @returns {Nothing} A new Nothing instance.
     * @example
     * const maybe = Maybe.Nothing();
     */
  }, {
    key: "nothing",
    value: function nothing() {
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
  }, {
    key: "of",
    value: function of(value) {
      return value !== null && value !== undefined ? Maybe.just(value) : Maybe.nothing();
    }
  }]);
  return Maybe;
}();
/**
 * Represents a Maybe instance with a value.
 * @class
 */
exports.Maybe = Maybe;
var _value = /*#__PURE__*/new WeakMap();
var Just = /*#__PURE__*/function (_Maybe) {
  _inherits(Just, _Maybe);
  var _super = _createSuper(Just);
  /**
   * Creates a new Maybe instance with the given value. This constructor should not be called directly. Instead, use Maybe's static 'Just' method.
   * @class
   * @param {*} value - The value to wrap in a Maybe instance.
   * @example
   * const maybeNum = new Maybe.Just(42);
   * const maybeStr = new Maybe.Just("hello");
   */
  function Just(value) {
    var _this;
    _classCallCheck(this, Just);
    _this = _super.call(this);
    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _value, {
      writable: true,
      value: void 0
    });
    _defineProperty(_assertThisInitialized(_this), "_tag", 'Just');
    _classPrivateFieldSet(_assertThisInitialized(_this), _value, value);
    return _this;
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
  _createClass(Just, [{
    key: "map",
    value: function map(fn) {
      return Maybe.just(fn(_classPrivateFieldGet(this, _value)));
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
  }, {
    key: "chain",
    value: function chain(fn) {
      return fn(_classPrivateFieldGet(this, _value));
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
  }, {
    key: "ap",
    value: function ap(something) {
      return something.map(_classPrivateFieldGet(this, _value));
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
  }, {
    key: "getOrElse",
    value: function getOrElse() {
      return _classPrivateFieldGet(this, _value);
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
  }, {
    key: "fold",
    value: function fold(f, g) {
      return g(_classPrivateFieldGet(this, _value));
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
      fn(_classPrivateFieldGet(this, _value));
      return this;
    }
  }]);
  return Just;
}(Maybe);
/**
 * Represents a Maybe instance with no value.
 * @class
 */
exports.Just = Just;
var Nothing = /*#__PURE__*/function () {
  function Nothing() {
    _classCallCheck(this, Nothing);
    _defineProperty(this, "_tag", 'Nothing');
  }
  _createClass(Nothing, [{
    key: "map",
    value:
    /**
     * Returns this instance, indicating that no function should be applied to it.
     * @param {Function} fn - The function to apply to the value.
     * @returns {Nothing} This instance.
     * @example
     * const maybe = Maybe.Nothing();
     * const result = maybe.map(x => x + 1); // returns Nothing, short-circuiting the function and any subsequent operations
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
     * Returns the given fallback value
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
  }, {
    key: "fold",
    value: function fold(f, g) {
      return f();
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
  return Nothing;
}();
exports.Nothing = Nothing;