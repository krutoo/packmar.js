/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/demo/js/components/App.js":
/*!***************************************!*\
  !*** ./src/demo/js/components/App.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<div class="app-wrapper display_flex width_100percent">\n\t\t\t<div class="main-content">\n\t\t\t\t<h1 class="main-title">', '</h1>\n\t\t\t\t', '\n\t\t\t\t<button class="width_100percent create-note-button" click=', '>To Do</button>\n\t\t\t\t', '\n\t\t\t\t<div class="notes-list">\n\t\t\t\t\t', '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t', '\n\t\t</div>\n\t'], ['\n\t\t<div class="app-wrapper display_flex width_100percent">\n\t\t\t<div class="main-content">\n\t\t\t\t<h1 class="main-title">', '</h1>\n\t\t\t\t', '\n\t\t\t\t<button class="width_100percent create-note-button" click=', '>To Do</button>\n\t\t\t\t', '\n\t\t\t\t<div class="notes-list">\n\t\t\t\t\t', '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t', '\n\t\t</div>\n\t']);

exports.default = App;

var _packmar = __webpack_require__(/*! packmar */ "./src/library/js/index.js");

var _Field = __webpack_require__(/*! ./Field */ "./src/demo/js/components/Field.js");

var _Field2 = _interopRequireDefault(_Field);

var _Note = __webpack_require__(/*! ./Note */ "./src/demo/js/components/Note.js");

var _Note2 = _interopRequireDefault(_Note);

var _Footer = __webpack_require__(/*! ./Footer */ "./src/demo/js/components/Footer.js");

var _Footer2 = _interopRequireDefault(_Footer);

var _Filters = __webpack_require__(/*! ./Filters */ "./src/demo/js/components/Filters.js");

var _Filters2 = _interopRequireDefault(_Filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function App(options) {
	var title = options.title,
	    currentText = options.currentText,
	    currentFilterName = options.currentFilterName,
	    notes = options.notes,
	    filters = options.filters,
	    typeNote = options.typeNote,
	    addNote = options.addNote,
	    checkNote = options.checkNote,
	    removeNote = options.removeNote,
	    selectFilter = options.selectFilter;

	var defaultCheck = function defaultCheck() {
		return true;
	};
	var currentFilter = filters.find(function (filter) {
		return filter.name === currentFilterName;
	}) || {};
	var needShowNote = currentFilter.check || defaultCheck;
	return (0, _packmar.pack)(_templateObject, title, (0, _Field2.default)({
		placeholder: 'Just start typing...',
		value: currentText,
		onInput: typeNote
	}), addNote, notes.length ? (0, _Filters2.default)({
		filters: filters,
		selectFilter: selectFilter,
		currentFilter: currentFilter
	}) : '', notes.filter(needShowNote).map(function (note) {
		return (0, _Note2.default)({
			noteText: note.text,
			isCompleted: note.checked,
			onCheck: function onCheck() {
				return checkNote(note.id);
			},
			onRemove: function onRemove() {
				return removeNote(note.id);
			}
		});
	}), (0, _Footer2.default)());
}

/***/ }),

/***/ "./src/demo/js/components/Field.js":
/*!*****************************************!*\
  !*** ./src/demo/js/components/Field.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<textarea\n\t\t\trows="5"\n\t\t\tclass="main-field display_block width_100percent"\n\t\t\tplaceholder=', '\n\t\t\tinput=', '\n\t\t>', '</textarea>\n\t'], ['\n\t\t<textarea\n\t\t\trows="5"\n\t\t\tclass="main-field display_block width_100percent"\n\t\t\tplaceholder=', '\n\t\t\tinput=', '\n\t\t>', '</textarea>\n\t']);

exports.default = Field;

var _packmar = __webpack_require__(/*! packmar */ "./src/library/js/index.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Field(_ref) {
	var value = _ref.value,
	    placeholder = _ref.placeholder,
	    onInput = _ref.onInput;

	return (0, _packmar.pack)(_templateObject, placeholder, onInput, value);
}

/***/ }),

/***/ "./src/demo/js/components/Filters.js":
/*!*******************************************!*\
  !*** ./src/demo/js/components/Filters.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<div class="filters display_flex">\n\t\t\t', '\n\t\t</div>\n\t'], ['\n\t\t<div class="filters display_flex">\n\t\t\t', '\n\t\t</div>\n\t']),
    _templateObject2 = _taggedTemplateLiteral(['\n\t\t\t\t\t<button\n\t\t\t\t\t\tclass=', '\n\t\t\t\t\t\tclick=', '\n\t\t\t\t\t>\n\t\t\t\t\t\t', '\n\t\t\t\t\t</button>\n\t\t\t\t'], ['\n\t\t\t\t\t<button\n\t\t\t\t\t\tclass=', '\n\t\t\t\t\t\tclick=', '\n\t\t\t\t\t>\n\t\t\t\t\t\t', '\n\t\t\t\t\t</button>\n\t\t\t\t']);

exports.default = Filters;

var _packmar = __webpack_require__(/*! packmar */ "./src/library/js/index.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Filters(_ref) {
	var filters = _ref.filters,
	    selectFilter = _ref.selectFilter,
	    currentFilter = _ref.currentFilter;

	return (0, _packmar.pack)(_templateObject, filters.map(function (filter) {
		var isActive = filter.name === currentFilter.name;
		return (0, _packmar.pack)(_templateObject2, 'filter-button ' + (isActive ? 'active' : ''), function () {
			return selectFilter(filter.name);
		}, filter.name);
	}));
}

/***/ }),

/***/ "./src/demo/js/components/Footer.js":
/*!******************************************!*\
  !*** ./src/demo/js/components/Footer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<footer class="main-footer">\n\t\t\tThis SPA is <b>packmar</b> library work demo.\n\t\t\tCheck it on <a href="https://github.com/krutoo/packmar.js" target="_blank">GitHub</a>.\n\t\t</footer>\n\t'], ['\n\t\t<footer class="main-footer">\n\t\t\tThis SPA is <b>packmar</b> library work demo.\n\t\t\tCheck it on <a href="https://github.com/krutoo/packmar.js" target="_blank">GitHub</a>.\n\t\t</footer>\n\t']);

exports.default = Footer;

var _packmar = __webpack_require__(/*! packmar */ "./src/library/js/index.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Footer() {
	return (0, _packmar.pack)(_templateObject);
}

/***/ }),

/***/ "./src/demo/js/components/Note.js":
/*!****************************************!*\
  !*** ./src/demo/js/components/Note.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\t<div class="formatted">\n\t\t\t', '\n\t\t</div>\n\t'], ['\n\t\t<div class="formatted">\n\t\t\t', '\n\t\t</div>\n\t']),
    _templateObject2 = _taggedTemplateLiteral(['<span>', '<br /></span>'], ['<span>', '<br /></span>']),
    _templateObject3 = _taggedTemplateLiteral(['\n\t\t<div class="note overflow_hidden">\n\t\t\t<button class="button check-button overflow_hidden" click="', '">\n\t\t\t\t', '\n\t\t\t</button>\n\t\t\t<div class=', '>\n\t\t\t\t', '\n\t\t\t</div>\n\t\t\t<button class="button remove-button overflow_hidden" click=', '>\n\t\t\t\t\u274C\n\t\t\t</button>\n\t\t</div>\n\t'], ['\n\t\t<div class="note overflow_hidden">\n\t\t\t<button class="button check-button overflow_hidden" click="', '">\n\t\t\t\t', '\n\t\t\t</button>\n\t\t\t<div class=', '>\n\t\t\t\t', '\n\t\t\t</div>\n\t\t\t<button class="button remove-button overflow_hidden" click=', '>\n\t\t\t\t\u274C\n\t\t\t</button>\n\t\t</div>\n\t']);

exports.default = Note;

var _packmar = __webpack_require__(/*! packmar */ "./src/library/js/index.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function Note(_ref) {
	var noteText = _ref.noteText,
	    isCompleted = _ref.isCompleted,
	    onRemove = _ref.onRemove,
	    onCheck = _ref.onCheck;

	var textClasses = 'text ' + (isCompleted ? 'text-decoration_line-through' : '');
	var formattedText = (0, _packmar.pack)(_templateObject, noteText.split('\n').map(function (part) {
		return (0, _packmar.pack)(_templateObject2, part);
	}));
	return (0, _packmar.pack)(_templateObject3, onCheck, isCompleted ? '✔️' : '', textClasses, formattedText, onRemove);
}

/***/ }),

/***/ "./src/demo/js/index.js":
/*!******************************!*\
  !*** ./src/demo/js/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _packmar = __webpack_require__(/*! packmar */ "./src/library/js/index.js");

var _App = __webpack_require__(/*! ./components/App */ "./src/demo/js/components/App.js");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILTERS = Object.freeze([{ name: 'All', check: function check() {
		return true;
	} }, { name: 'Active', check: function check(note) {
		return !note.checked;
	} }, { name: 'Completed', check: function check(note) {
		return note.checked;
	} }]);

var DEFAULT_STATE = Object.freeze({
	currentFilterName: FILTERS[0].name,
	currentText: '',
	notes: [{ id: 1, text: 'Check the packmar.js demo', checked: true }, { id: 2, text: 'Create new note', checked: false }, { id: 3, text: 'mark any note as done ', checked: false }, { id: 4, text: 'Delete any note', checked: false }]
});

var pressedKeys = {};

var state = void 0;

window.addEventListener('DOMContentLoaded', initialize);

function initialize() {
	var initialState = JSON.parse(localStorage.getItem('state'));
	state = _extends({}, DEFAULT_STATE, initialState);
	renderApp();
	focusOnField();
	window.addEventListener('beforeunload', saveToLocalStorage);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
}

function onKeyDown(_ref) {
	var key = _ref.key;

	pressedKeys[key] = true;
	var isPrintable = key.length === 1;
	var isKeysCombination = Object.keys(pressedKeys).length > 1;
	if (isPrintable && !isKeysCombination) {
		focusOnField();
	}
}

function onKeyUp(_ref2) {
	var key = _ref2.key;

	delete pressedKeys[key];
}

function saveToLocalStorage() {
	localStorage.setItem('state', JSON.stringify(state));
}

function typeNote(_ref3) {
	var target = _ref3.target;

	state.currentText = target.value;
}

function addNote() {
	var hasText = state.currentText.replace(/\s*/g, '').length;
	if (hasText) {
		state.notes.unshift({
			id: Date.now(),
			text: state.currentText.trim(),
			checked: false
		});
		state.currentText = '';
		renderApp();
	} else {
		focusOnField();
	}
}

function focusOnField() {
	var field = document.querySelector('.main-field');
	if (field) {
		field.focus();
	}
}

function checkNote(noteId) {
	var targetNote = state.notes.find(function (note) {
		return note.id === noteId;
	});
	targetNote.checked = !targetNote.checked;
	renderApp();
}

function removeNote(noteId) {
	state.notes = state.notes.filter(function (note) {
		return note.id !== noteId;
	});
	if (state.notes.length === 0) {
		selectFilter(FILTERS[0].name);
	} else {
		renderApp();
	}
}

function selectFilter(filterName) {
	state.currentFilterName = filterName;
	renderApp();
}

function renderApp() {
	var app = (0, _App2.default)({
		title: '📝 To Do App',
		currentText: state.currentText,
		currentFilterName: state.currentFilterName,
		notes: state.notes,
		filters: FILTERS,
		typeNote: typeNote,
		addNote: addNote,
		checkNote: checkNote,
		removeNote: removeNote,
		selectFilter: selectFilter
	});
	(0, _packmar.render)(app, document.body);
}

/***/ }),

/***/ "./src/demo/scss/index.scss":
/*!**********************************!*\
  !*** ./src/demo/scss/index.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/library/js/index.js":
/*!*********************************!*\
  !*** ./src/library/js/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.pack = undefined;

var _pack = __webpack_require__(/*! ./pack */ "./src/library/js/pack.js");

var _pack2 = _interopRequireDefault(_pack);

var _render = __webpack_require__(/*! ./render */ "./src/library/js/render.js");

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.pack = _pack2.default;
exports.render = _render2.default;

/***/ }),

/***/ "./src/library/js/pack.js":
/*!********************************!*\
  !*** ./src/library/js/pack.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = pack;
/**
 * Tag for template literals. Returns the packed element.
 * @param {Array} strings String part of template literal.
 * @param {...*} values Values part.
 * @return {Object} Packed element.
 */
function pack(strings) {
	var parts = [];
	var valuesMap = {};

	for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		values[_key - 1] = arguments[_key];
	}

	for (var index = 0; index < strings.length; index++) {
		parts.push(strings[index]);
		if (values.hasOwnProperty(index)) {
			var anchor = getAnchor(valuesMap);
			valuesMap[anchor] = values[index];
			parts.push(anchor);
		}
	}
	var htmlString = parts.join('').trim();
	return Object.freeze({ htmlString: htmlString, valuesMap: valuesMap });
}

function getAnchor(valuesMap) {
	var length = Object.keys(valuesMap).length;
	var anchor = '{%' + length + '%}';
	return anchor;
}

/***/ }),

/***/ "./src/library/js/render.js":
/*!**********************************!*\
  !*** ./src/library/js/render.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = render;

var _utils = __webpack_require__(/*! ./utils */ "./src/library/js/utils.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var templates = new Map();
var anchorsRegex = /{%\d*%}/g;

/**
 * Render packed element.
 * @param {Object} pack Packed element.
 * @param {Element} [rootElement] Element to place packed element into.
 * @param {boolean} [needKeepContent] Need keep root element content?.
 * @return {Element} unpacked element, normal dom node.
 */
function render(_ref, rootElement, needKeepContent) {
	var htmlString = _ref.htmlString,
	    valuesMap = _ref.valuesMap;

	if (!isPack(arguments[0])) {
		throw new TypeError('First argument must be packed element');
	}
	var template = getTemplate(htmlString);
	replaceAnchors(template);
	processNode(template, valuesMap);
	if (template.children.length !== 1) {
		throw new RangeError('Template must contains only one element');
	}
	if (rootElement instanceof Element) {
		if (!needKeepContent) {
			rootElement.innerHTML = '';
		}
		if (template.children.length) {
			rootElement.insertAdjacentElement('beforeEnd', template.children[0]);
		}
	}
	return template.children[0];
}

function getTemplate(htmlString) {
	var template = void 0;
	if (templates.has(htmlString)) {
		template = templates.get(htmlString);
	} else {
		template = createTemplate(htmlString);
		templates.set(htmlString, template);
	}
	return template.cloneNode(true);
}

function replaceAnchors(node) {
	if (node instanceof Element) {
		if (node.hasChildNodes()) {
			[].concat(_toConsumableArray(node.childNodes)).forEach(function (node) {
				return replaceAnchors(node);
			});
		}
	} else if (anchorsRegex.test(node.nodeValue)) {
		var templateString = node.nodeValue.replace(anchorsRegex, function (match) {
			return '<!--' + match + '-->';
		});
		var template = getTemplate(templateString);
		[].concat(_toConsumableArray(template.childNodes)).forEach(function (childNode) {
			node.parentNode.insertBefore(childNode, node);
		});
		node.remove();
	}
}

function processNode(node, valuesMap) {
	if (node.hasChildNodes()) {
		[].concat(_toConsumableArray(node.childNodes)).forEach(function (child) {
			return processNode(child, valuesMap);
		});
	}
	if (node instanceof Element) {
		processAttributes(node, valuesMap);
	} else if (node instanceof Comment) {
		processComment(node, valuesMap);
	}
}

function processComment(commentNode, valuesMap) {
	var key = commentNode.nodeValue;
	if (valuesMap.hasOwnProperty(key)) {
		var value = valuesMap[key];
		switch ((0, _utils.classOf)(value)) {
			case 'Boolean':
			case 'Number':
			case 'String':
				{
					var newElement = createTemplate(String(value), true);
					commentNode.replaceWith(newElement.firstChild);
					break;
				}
			case 'Array':
				{
					value.forEach(function (item) {
						if (isPack(item)) {
							commentNode.parentNode.insertBefore(render(item), commentNode);
						} else {
							throw new TypeError('Only the packed elements can be in the arrays');
						}
					});
					break;
				}
			default:
				{
					if (isPack(value)) {
						commentNode.parentNode.insertBefore(render(value), commentNode);
					}
				}
		}
		commentNode.remove();
	}
}

function processAttributes(element, valuesMap) {
	[].concat(_toConsumableArray(element.attributes)).forEach(function (_ref2) {
		var name = _ref2.name,
		    value = _ref2.value;

		if (valuesMap.hasOwnProperty(value.trim())) {
			element.valuesMap = element.valuesMap || {};
			var targetValue = valuesMap[value.trim()];
			switch ((0, _utils.classOf)(targetValue)) {
				case 'Number':
				case 'String':
					{
						element.setAttribute(name, targetValue);
						break;
					}
				case 'Boolean':
					{
						if (targetValue) {
							element.setAttribute(name, '');
						} else {
							element.removeAttribute(name);
						}
						break;
					}
				case 'Function':
					{
						element.removeAttribute(name);
						element.addEventListener(name, targetValue);
						break;
					}
				default:
					{
						if (isPack(targetValue)) {
							element.setAttribute(name, render(targetValue).innerHTML);
						} else {
							element.removeAttribute(name);
						}
					}
			}
		} else if (valuesMap.hasOwnProperty(name.trim())) {
			var _targetValue = valuesMap[name.trim()];
			element.removeAttribute(name);
			element.setAttribute(_targetValue, true);
		} else if (value.match(anchorsRegex)) {
			throw new SyntaxError('In "' + name + '" attribute: only one string or one expression must be in value');
		}
	});
}

function createTemplate(htmlString, asText) {
	var template = String(htmlString || '').trim();
	var templateElement = document.createElement('div');
	if (asText) {
		templateElement.insertAdjacentText('afterBegin', template);
	} else {
		templateElement.insertAdjacentHTML('afterBegin', template);
	}
	return templateElement;
}

function isPack(value) {
	var content = _extends({}, value);
	var hasTemplate = (0, _utils.classOf)(content.htmlString) === 'String';
	var hasMap = (0, _utils.classOf)(content.valuesMap) === 'Object';
	return hasTemplate && hasMap;
}

/***/ }),

/***/ "./src/library/js/utils.js":
/*!*********************************!*\
  !*** ./src/library/js/utils.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Return a class name of input value (true way to get it).
 * @param {*} value Value to define it class.
 * @return {string} Name of class.
 */
var classOf = exports.classOf = function classOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
};

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./src/demo/js/index.js ./src/demo/scss/index.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/demo/js/index.js */"./src/demo/js/index.js");
module.exports = __webpack_require__(/*! ./src/demo/scss/index.scss */"./src/demo/scss/index.scss");


/***/ })

/******/ });
//# sourceMappingURL=demo.js.map