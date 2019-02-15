import { classOf } from './utils.js';

const templates = new Map();
const anchorsRegex = /{%\d*%}/g;

/**
 * Render packed element.
 * @param {Object} pack Packed element.
 * @param {Element} [rootElement] Element to place packed element into.
 * @param {boolean} [needKeepContent] Need keep root element content?
 * @return {Element} Unpacked element, normal dom node.
 */
export default function render ({ template, values }, rootElement, needKeepContent) {
	if (!isPack(arguments[0])) {
		throw new TypeError('First argument must be packed element');
	}
	const $container = getTemplate(template);
	replaceAnchors($container);
	processNode($container, values);
	if ($container.children.length !== 1) {
		throw new RangeError('Template must contains only one element');
	}
	if (rootElement instanceof Element) {
		if (!needKeepContent) {
			rootElement.innerHTML = '';
		}
		if ($container.children.length) {
			rootElement.insertAdjacentElement('beforeEnd', $container.children[0]);
		}
	}
	return $container.children[0];
}

/**
 * Returns template element for HTML-string.
 * @param {string} htmlString HTML string.
 * @return {Element} Template element.
 */
function getTemplate (htmlString) {
	let template;
	if (templates.has(htmlString)) {
		template = templates.get(htmlString);
	} else {
		template = createTemplate(htmlString);
		templates.set(htmlString, template);
	}
	return template.cloneNode(true);
}

/**
 * Replaces anchors by anchor-comments in element.
 * @param {Node} node Node to replace anchors in it.
 */
function replaceAnchors (node) {
	if (node instanceof Element) {
		if (node.hasChildNodes()) {
			[...node.childNodes].forEach(node => replaceAnchors(node));
		}
	} else if (anchorsRegex.test(node.nodeValue)) {
		const templateString = node.nodeValue.replace(anchorsRegex, match => `<!--${match}-->`);
		const template = getTemplate(templateString);
		[...template.childNodes].forEach(childNode => {
			node.parentNode.insertBefore(childNode, node);
		});
		node.remove();
	}
}

/**
 * Processes node. Inserts values from map instead of anchor-comments.
 * @param {Node} node Node to process.
 * @param {Object} values Values map.
 */
function processNode (node, values) {
	if (node.hasChildNodes()) {
		[...node.childNodes].forEach(child => processNode(child, values));
	}
	if (node instanceof Element) {
		processAttributes(node, values);
	} else if (node instanceof Comment) {
		processComment(node, values);
	}
}

/**
 * Processes anchor-comment. Inserts value from map instead of comment.
 * @param {Node} commentNode Comment node to process.
 * @param {Object} values Values map.
 */
function processComment (commentNode, values) {
	const key = commentNode.nodeValue;
	if (values.hasOwnProperty(key)) {
		const value = values[key];
		switch (classOf(value)) {
			case 'Boolean':
			case 'Number':
			case 'String': {
				const newElement = createTemplate(String(value), true);
				commentNode.replaceWith(newElement.firstChild);
				break;
			}
			case 'Array': {
				value.forEach(item => {
					if (isPack(item)) {
						commentNode.parentNode.insertBefore(render(item), commentNode);
					} else {
						throw new TypeError('Only the packed elements can be in the arrays');
					}
				});
				break;
			}
			default: {
				if (isPack(value)) {
					commentNode.parentNode.insertBefore(render(value), commentNode);
				}
			}
		}
		commentNode.remove();
	}
}

/**
 * Processes attributes of element. Inserts value from map instead of anchors.
 * @param {Element} element Element for processing its attributes.
 * @param {Object} values Values map.
 */
function processAttributes (element, values) {
	[...element.attributes].forEach(({ name, value }) => {
		if (values.hasOwnProperty(value.trim())) {
			element.values = element.values || {};
			const targetValue = values[value.trim()];
			switch (classOf(targetValue)) {
				case 'Number':
				case 'String': {
					element.setAttribute(name, targetValue);
					break;
				}
				case 'Boolean': {
					if (targetValue) {
						element.setAttribute(name, '');
					} else {
						element.removeAttribute(name);
					}
					break;
				}
				case 'Function': {
					element.removeAttribute(name);
					element.addEventListener(name, targetValue);
					break;
				}
				default: {
					if (isPack(targetValue)) {
						element.setAttribute(name, render(targetValue).innerHTML);
					} else {
						element.removeAttribute(name);
					}
				}
			}
		} else if (values.hasOwnProperty(name.trim())) {
			const targetValue = values[name.trim()];
			element.removeAttribute(name);
			element.setAttribute(targetValue, true);
		} else if (value.match(anchorsRegex)) {
			throw new SyntaxError(`In "${name}" attribute: only one string or one expression must be in value`);
		}
	});
}

/**
 * Returns new DIV element with content from HTML string.
 * @param {string} htmlString HTML string.
 * @param {boolean} asText Need parse string as simple text?
 * @return {Element} New DIV element.
 */
function createTemplate (htmlString, asText) {
	const template = String(htmlString || '').trim();
	const templateElement = document.createElement('div');
	if (asText) {
		templateElement.insertAdjacentText('afterBegin', template);
	} else {
		templateElement.insertAdjacentHTML('afterBegin', template);
	}
	return templateElement;
}

/**
 * Verifies that value is a markup package.
 * @param {*} value Checked value.
 * @return {boolean} Value is a valid package?
 */
function isPack (value) {
	const content = { ...value };
	const hasTemplate = classOf(content.template) === 'String';
	const hasMap = classOf(content.values) === 'Object';
	return hasTemplate && hasMap;
}
