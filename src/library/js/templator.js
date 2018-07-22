import { classOf } from './utils';

const baseNodes = new Map();

export function html (strings, ...values) {
	const valuesBuffer = {};
	const template = getBaseTemplate(strings, values, valuesBuffer);
	const node = getBaseNode(template);
	processNode(node, valuesBuffer);
	return node;
}

function getBaseTemplate (strings, values, valuesBuffer) {
	const html = [];
	for (let i = 0; i < strings.length; i++) {
		html.push(strings[i]);
		if (values.hasOwnProperty(i)) {
			html.push(processValue(values[i], valuesBuffer));
		}
	}
	return html.join('').trim();
}

function processValue (value, valuesBuffer) {
	const length = Object.keys(valuesBuffer).length;
	// обработать массив здесь?
	const substituteValue = `<!--{{${length}}}-->`;
	valuesBuffer[substituteValue] = value;
	return substituteValue;
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
		// @todo убрать обертку с комментарием
		const key = `<!--${node.nodeValue}-->`;
		if (valuesBuffer.hasOwnProperty(key)) {
			const value = valuesBuffer[key];
			switch (classOf(value)) {
				case 'Boolean':
				case 'Number':
				case 'String': {
					const newNode = createNode(value);
					if (newNode) {
						node.replaceWith(newNode);
					}
					break;
				}
				case 'Array': {
					value.forEach(item => {
						if (item instanceof Node) {
							node.parentNode.insertBefore(item, node);
						}
					});
					node.remove();
					break;
				}
				default: {
					if (value instanceof Node) {
						node.replaceWith(value);
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
				case 'Boolean':
				case 'Number':
				case 'String': {
					// @todo переделать, бросать предупреждение о неправильном имени атрибута.
					element.removeAttribute(name, targetValue);
					element[name] = targetValue;
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

function createNode (htmlString) {
	const temporaryElement = document.createElement('div');
	const template = String(htmlString || '').trim();
	temporaryElement.insertAdjacentHTML('afterbegin', template);
	return temporaryElement.firstChild;
}
