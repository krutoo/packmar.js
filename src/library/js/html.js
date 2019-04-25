import pack from './pack.js';
import {
	passValues,
	getTemplate,
	cloneVirtualNode,
	convertToVirtualNode,
} from './convert.js';

/**
 * Cache of virtual DOM nodes. Map keys is html markup.
 * @type {Map}
 */
const virtualNodes = new Map();

/**
 * Template literal tag. Returns a virtual DOM node by html string.
 * @param {Array} strings String part of template literal.
 * @param {...*} values Values part.
 * @return {VirtualNode} Virtual DOM node.
 */
export default function html (...args) {
	const { template: key, values } = pack(...args);
	let virtualNode;
	if (virtualNodes.has(key)) {
		virtualNode = virtualNodes.get(key);
	} else {
		virtualNode = convertToVirtualNode(getTemplate(key).firstElementChild);
		virtualNodes.set(key, virtualNode);
	}
	return passValues(cloneVirtualNode(virtualNode), values);
}
