"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _maybe = require("./maybe");
Object.keys(_maybe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _maybe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _maybe[key];
    }
  });
});