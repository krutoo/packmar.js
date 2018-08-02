import { classOf } from './utils';

const templates = new Map();
const anchorsRegex = /{%\d*%}/g;

/**
 * Render packed element.
 * @param {Object} pack Packed element.
 * @param {Element} [rootElement] Element to place packed element into.
 * @param {boolean} [needKeepContent] Need keep root element content?.
 * @return {Element} unpacked element, normal dom node.
 */
export function render ({ htmlString, valuesMap }, rootElement, needKeepContent) {
	if (!isPack(arguments[0])) {
		throw new TypeError('First argument must be packed element');
	}
	const template = getTemplate(htmlString);
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

function processNode (node, valuesMap) {
	if (node.hasChildNodes()) {
		[...node.childNodes].forEach(child => processNode(child, valuesMap));
	}
	if (node instanceof Element) {
		processAttributes(node, valuesMap);
	} else if (node instanceof Comment) {
		processComment(node, valuesMap);
	}
}

function processComment (commentNode, valuesMap) {
	const key = commentNode.nodeValue;
	if (valuesMap.hasOwnProperty(key)) {
		const value = valuesMap[key];
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

function processAttributes (element, valuesMap) {
	[...element.attributes].forEach(({ name, value }) => {
		if (valuesMap.hasOwnProperty(value.trim())) {
			element.valuesMap = element.valuesMap || {};
			const targetValue = valuesMap[value.trim()];
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
		} else if (valuesMap.hasOwnProperty(name.trim())) {
			const targetValue = valuesMap[name.trim()];
			element.removeAttribute(name);
			element.setAttribute(targetValue, true);
		} else if (value.match(anchorsRegex)) {
			throw new SyntaxError(`In "${name}" attribute: only one string or one expression must be in value`);
		}
	});
}

function createTemplate (htmlString, asText) {
	htmlString = String(htmlString || '').trim();
	const templateElement = document.createElement('div');
	if (asText) {
		templateElement.insertAdjacentText('afterBegin', htmlString);
	} else {
		templateElement.insertAdjacentHTML('afterBegin', htmlString);
	}
	return templateElement;
}

function isPack (value) {
	value = value || {};
	const hasTemplate = classOf(value.htmlString) === 'String';
	const hasMap = classOf(value.valuesMap) === 'Object';
	return hasTemplate && hasMap;
}
