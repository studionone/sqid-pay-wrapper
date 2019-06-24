"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SQID = void 0;

var _md = _interopRequireDefault(require("md5"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SQID = function SQID(_apiKey, _merchantCode, _environmentBaseURI) {
  var _this = this;

  var passPhrase = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, SQID);

  _defineProperty(this, "_generateHash", function (primaryKey) {
    return (0, _md["default"])("".concat(_this.passPhrase).concat(primaryKey).concat(_this.apiKey));
  });

  _defineProperty(this, "_sqidRequest", function (payload, endpoint, methodName) {
    var primaryKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var merchantCode = _this.merchantCode,
        apiKey = _this.apiKey,
        environmentBaseURI = _this.environmentBaseURI;
    var hash = _this.passPhrase ? _this._generateHash(primaryKey) : null;

    var data = _objectSpread({}, payload, {
      apiKey: apiKey,
      hash: hash,
      hashValue: hash,
      merchantCode: merchantCode,
      methodName: methodName
    });

    var options = {
      baseURL: environmentBaseURI,
      url: "/".concat(endpoint),
      method: 'post',
      data: data
    };
    return (0, _axios["default"])(options).then(function (res) {
      return res;
    })["catch"](function (err) {
      return err;
    });
  });

  _defineProperty(this, "getToken", function (data) {
    return _this._sqidRequest(data, 'post', 'getToken');
  });

  this.apiKey = _apiKey;
  this.merchantCode = _merchantCode;
  this.environmentBaseURI = _environmentBaseURI;
  this.passPhrase = passPhrase;
}
/**
 * Generate the hash string required by Sqid requests
 * @param  {string} primaryKey - The value to be hashed
 * @return {string}            - The final hash string
 */
;

exports.SQID = SQID;