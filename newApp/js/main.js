/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _url = __webpack_require__(2);

	var _url2 = _interopRequireDefault(_url);

	var _router = __webpack_require__(4);

	var _router2 = _interopRequireDefault(_router);

	var _selector = __webpack_require__(9);

	var _selector2 = _interopRequireDefault(_selector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = new _router2.default();

	(0, _selector2.default)('nav a').on('click', new _url2.default().redirect);

	router.run();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(3);

	var _base2 = _interopRequireDefault(_base);

	var _router = __webpack_require__(4);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Url = function (_Base) {
	    _inherits(Url, _Base);

	    function Url() {
	        _classCallCheck(this, Url);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Url).apply(this, arguments));
	    }

	    _createClass(Url, [{
	        key: 'redirect',

	        /**
	         * Redirect application to different view.
	         *
	         * @param event
	         * @returns {string}
	         */
	        value: function redirect(event) {
	            var url = event.target.getAttribute('href');

	            event.preventDefault();

	            return _router2.default.goTo(url);
	        }
	    }]);

	    return Url;
	}(_base2.default);

	exports.default = Url;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Base = function Base() {
	  _classCallCheck(this, Base);
	};

	exports.default = Base;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _routes = __webpack_require__(5);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Router = function () {
	    function Router() {
	        _classCallCheck(this, Router);
	    }

	    _createClass(Router, [{
	        key: 'getPath',

	        /**
	         * Parse the hash path to be used throughout the system.
	         *
	         * @returns {string}
	         */
	        value: function getPath() {
	            var hash = window.location.hash === '' ? '#/' : window.location.hash;

	            return hash.substr(1);
	        }

	        /**
	         * Change the hash url on the fly.
	         *
	         * @param path
	         * @returns {*}
	         */

	    }, {
	        key: 'goTo',
	        value: function goTo(path) {
	            window.location.hash = '#' + path;

	            return this.run();
	        }

	        /**
	         * Run route specific method.
	         *
	         * @returns {*}
	         */

	    }, {
	        key: 'run',
	        value: function run() {
	            var action = void 0,
	                controller = void 0,
	                Route = _routes2.default[this.getPath()],
	                method = (Route.method || 'GET').toUpperCase();

	            try {
	                controller = new Route.controller();
	            } catch (e) {
	                console.error('Could not find the "' + Route.controller + '" controller.');
	                return;
	            }

	            try {
	                action = controller[Route.action];
	            } catch (e) {
	                console.error('The "' + Route.controller + '::' + Route.action + '" method is not defined.');
	                return;
	            }

	            return action();
	        }
	    }]);

	    return Router;
	}();

	exports.default = Router;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(7);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = {
	    "/": {
	        "action": "index",
	        "controller": _main2.default
	    },
	    "/test": {
	        "action": "test",
	        "controller": _main2.default
	    }
	};

	exports.default = routes;

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base = __webpack_require__(8);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Main = function (_Base) {
	    _inherits(Main, _Base);

	    function Main() {
	        _classCallCheck(this, Main);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
	    }

	    _createClass(Main, [{
	        key: 'index',
	        value: function index() {
	            console.log('Hello World!');
	        }
	    }, {
	        key: 'test',
	        value: function test() {
	            console.log('Testing...');
	        }
	    }]);

	    return Main;
	}(_base2.default);

	exports.default = Main;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Base = function Base() {
	  _classCallCheck(this, Base);
	};

	exports.default = Base;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Selector = function () {
	    /**
	     * Find any element matching the handle.
	     *
	     * @param handle
	     */

	    function Selector() {
	        var handle = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	        _classCallCheck(this, Selector);

	        this.handle = handle;
	        this.elements = document.querySelectorAll(handle);
	    }

	    /**
	     * Setup event listener for each of obtained elements.
	     *
	     * @param event
	     * @param callback
	     */


	    _createClass(Selector, [{
	        key: 'on',
	        value: function on(event, callback) {
	            if (!this.elements.length) {
	                return;
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var element = _step.value;

	                    element.addEventListener(event, callback);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return Selector;
	}();

	function $(handle) {
	    return new Selector(handle);
	}

	exports.default = Selector;
	exports.default = $;

/***/ }
/******/ ]);