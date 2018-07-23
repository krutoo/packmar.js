import { classOf } from './utils';

const baseNodes = new Map();

export function render ({ htmlString, valuesBuffer }, rootElement) {
	const node = getBaseNode(htmlString);
	processNode(node, valuesBuffer);
	rootElement.insertAdjacentElement('beforeEnd', node);
}

function getBaseNode (template) {
	let baseNode;
	if (baseNodes.has(template)) {
		baseNode = baseNodes.get(template);
	} else {
		baseNode = createNode(template);
		baseNodes.set(template, baseNode);
	}
	return baseNode.cloneNode(true);
}

function processNode (node, valuesBuffer) {
	if (node.childNodes.length) {
		[...node.childNodes].forEach(child => processNode(child, valuesBuffer));
	}
	if (node instanceof Element) {
		processAttributes(node, valuesBuffer);
	} else if (node instanceof Comment) {
		const key = `<!--${node.nodeValue}-->`;
		if (valuesBuffer.hasOwnProperty(key)) {
			const value = valuesBuffer[key];
			switch (classOf(value)) {
				case 'Boolean':
				case 'Number':
				case 'String': {
					const newNode = createNode(String(value), true);
					if (newNode) {
						node.replaceWith(newNode);
					}
					break;
				}
				case 'Array': {
					value.forEach(item => {
						if (isCompo(item)) {
							render(item, node.parentNode);
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

function processAttributes (element, valuesBuffer) {
	[...element.attributes].forEach(({ name, value }) => {
		if (valuesBuffer.hasOwnProperty(value)) {
			element.valuesBuffer = element.valuesBuffer || {};
			const targetValue = valuesBuffer[value];
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
					element.removeAttribute(name);
				}
			}
		}
	});
}

function createNode (htmlString, asText) {
	const temporaryElement = document.createElement('div');
	const template = String(htmlString || '').trim();
	if (asText) {
		temporaryElement.insertAdjacentText('afterBegin', template);
	} else {
		temporaryElement.insertAdjacentHTML('afterBegin', template);
	}
	return temporaryElement.firstChild;
}

function isCompo (value) {
	value = value || {};
	const hasTemplate = classOf(value.htmlString) === 'String';
	const hasBuffer = classOf(value.valuesBuffer) === 'Object';
	return hasTemplate && hasBuffer;
}
