"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SQID=void 0;var _md=_interopRequireDefault(require("md5")),_axios=_interopRequireDefault(require("axios"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _objectSpread(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){_defineProperty(a,b,c[b])})}return a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var SQID=function a(b,c,d){var e=this,f=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;_classCallCheck(this,a),_defineProperty(this,"_generateHash",function(a){return(0,_md["default"])("".concat(e.passPhrase).concat(a).concat(e.apiKey))}),_defineProperty(this,"_sqidRequest",function(a,b,c,d){var f=4<arguments.length&&void 0!==arguments[4]?arguments[4]:null,g=e.merchantCode,h=e.apiKey,i=e.environmentBaseURI,j=e.passPhrase?e._generateHash(f):null,k=_objectSpread({},"POST"===b?a:{},{apiKey:h,hash:j,hashValue:j,merchantCode:g,methodName:d}),l={baseURL:i,url:"/".concat(c),method:b,data:k};return"GET"===b&&(l.params=a),(0,_axios["default"])(l).then(function(a){return a})["catch"](function(a){return a})}),_defineProperty(this,"getToken",function(a){return e._sqidRequest(a,"POST","post","getToken")}),_defineProperty(this,"tokenInfo",function(a){return e._sqidRequest({token:a},"POST","post","tokenInfo",a)}),_defineProperty(this,"processTokenPayment",function(a){var b=a.amount.toFixed(2);return e._sqidRequest(a,"POST","post","processTokenPayment",b)}),_defineProperty(this,"getPaymentPage",function(a){var b=a.toUpperCase();return e._sqidRequest({payPageId:a},"GET","paypage/get",!1,b)}),_defineProperty(this,"payPaymentPage",function(a){var b=a.payPageId.toUpperCase();return e._sqidRequest(a,"POST","paypage/get",!1,b)}),this.apiKey=b,this.merchantCode=c,this.environmentBaseURI=d,this.passPhrase=f};exports.SQID=SQID;