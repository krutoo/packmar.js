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
	const element = getTemplateElement(htmlString);
	processNode(element, valuesMap);
	if (rootElement instanceof Element) {
		if (!needKeepContent) {
			rootElement.innerHTML = '';
		}
		if (element.children.length) {
			[...element.children].forEach(child => {
				rootElement.insertAdjacentElement('beforeEnd', child);
			});
		} else if (element.hasChildNodes()) {
			rootElement.insertAdjacentText('beforeEnd', element.textContent);
		}
	}
	return element;
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
	} else if (node instanceof Comment) {
		const key = `<!--${node.nodeValue}-->`;
		if (valuesMap.hasOwnProperty(key)) {
			const value = valuesMap[key];
			switch (classOf(value)) {
				case 'Boolean':
				case 'Number':
				case 'String': {
					const newNode = createTemplateElement(String(value), true);
					if (newNode.hasChildNodes()) {
						node.replaceWith(newNode.firstChild);
					}
					break;
				}
				case 'Array': {
					value.forEach(item => {
						if (isCompo(item)) {
							render(item, node.parentNode, true);
						}
						// @todo бросить ошибку в противно случае
					});
					node.remove();
					break;
				}
				default: {
					if (isCompo(value)) {
						render(value, node.parentNode);
					}
				}
			}
		}
	}
}

function processAttributes (element, valuesMap) {
	[...element.attributes].forEach(({ name, value }) => {
		if (valuesMap.hasOwnProperty(value)) {
			element.valuesMap = element.valuesMap || {};
			const targetValue = valuesMap[value];
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
						element.setAttribute(name, render(targetValue).textContent);
					} else {
						element.removeAttribute(name);
					}
				}
			}
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
