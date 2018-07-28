import { classOf } from './utils';

const baseNodes = new Map();

/**
 * Render compo in element.
 * @param {Object} compo Compo-element.
 * @param {Element} rootElement Element to place compo into.
 * @param {boolean} needKeepContent Need keep root element content?.
 * @return {Element} Template element.
 */
export function render ({ htmlString, valuesMap }, rootElement, needKeepContent) {
	if (!isCompo(arguments[0])) {
		throw new TypeError('First argument must be compo-element');
	}
	const element = getTemplateElement(htmlString);
	processNode(element, valuesMap);
	if (element.children.length !== 1) {
		throw new RangeError('Template must contains only one element');
	}
	if (rootElement instanceof Element) {
		if (!needKeepContent) {
			rootElement.innerHTML = '';
		}
		if (element.children.length) {
			rootElement.insertAdjacentElement('beforeEnd', element.children[0]);
		}
	}
	return element.children[0];
}

function getTemplateElement (template) {
	let baseNode;
	if (baseNodes.has(template)) {
		baseNode = baseNodes.get(template);
	} else {
		baseNode = createTemplateElement(template);
		baseNodes.set(template, baseNode);
	}
	return baseNode.cloneNode(true);
}

function processNode (node, valuesMap) {
	if (node.hasChildNodes()) {
		[...node.childNodes].forEach(child => processNode(child, valuesMap));
	}
	if (node instanceof Element) {
		processAttributes(node, valuesMap);
	} else {
		if (node instanceof Comment) {
			processComment(node, valuesMap);
		} else if (node instanceof Text) {
			processText(node, valuesMap);
		}
	}
}

function processComment (commentNode, valuesMap) {
	const key = `<!--${commentNode.nodeValue}-->`;
	if (valuesMap.hasOwnProperty(key)) {
		const value = valuesMap[key];
		switch (classOf(value)) {
			case 'Boolean':
			case 'Number':
			case 'String': {
				const newElement = createTemplateElement(String(value), true);
				commentNode.replaceWith(newElement.firstChild);
				break;
			}
			case 'Array': {
				value.forEach(item => {
					if (isCompo(item)) {
						commentNode.parentNode.insertBefore(render(item), commentNode);
					} else {
						throw new TypeError('Only the compo-objects can be in the arrays');
					}
				});
				break;
			}
			default: {
				if (isCompo(value)) {
					commentNode.parentNode.insertBefore(render(value), commentNode);
				}
			}
		}
		commentNode.remove();
	}
}

function processText (textNode, valuesMap) {
	const newNodeValue = textNode.nodeValue.replace(/<!--{%\d*%}-->/g, (match) => {
		let result = '';
		if (valuesMap.hasOwnProperty(match)) {
			const value = valuesMap[match];
			switch (classOf(value)) {
				case 'Boolean':
				case 'Number':
				case 'String': {
					result = String(value);
					break;
				}
				default: {
					if (isCompo(value)) {
						result = render(value).innerHTML;
					}
				}
			}
		}
		return result;
	});
	textNode.nodeValue = newNodeValue;
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
					if (isCompo(targetValue)) {
						element.setAttribute(name, render(targetValue).innerHTML);
					} else {
						element.removeAttribute(name);
					}
				}
			}
		} else if (value.match(/<!--{%\d*%}-->/)) {
			throw new SyntaxError(`In "${name}" attribute: Only one string or one expression must be in value`);
		}
	});
}

function createTemplateElement (htmlString, asText) {
	const template = String(htmlString || '').trim();
	const templateElement = document.createElement('div');
	if (asText) {
		templateElement.insertAdjacentText('afterBegin', template);
	} else {
		templateElement.insertAdjacentHTML('afterBegin', template);
	}
	return templateElement;
}

function isCompo (value) {
	value = value || {};
	const hasTemplate = classOf(value.htmlString) === 'String';
	const hasMap = classOf(value.valuesMap) === 'Object';
	return hasTemplate && hasMap;
}
