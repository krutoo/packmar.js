import { getTag, isFunction } from './utils.js';

/**
 * @typedef {Object} VirtualNode Virtual DOM node.
 * @property {(string|Function)} type String (e.g. 'div', 'span') or function that returns virtual node.
 * @property {Object} props Properties.
 * @property {Array} children Children.
 * @property {(Component|null)} component Owner component, null by default.
 */

/**
 * Tag of virtual DOM nodes.
 * @type {string}
 */
export const TAG_NAME = 'PackmarVirtualNode';

/**
 * Returns a new virtual DOM node.
 * @param {(string|Function)} type Type.
 * @param {Object} [props] Properties.
 * @param  {Array} children Children.
 * @return {VirtualNode} New virtual DOM node.
 */
export default function createVirtualNode (type, props, children) {
	return {
		[Symbol.toStringTag]: TAG_NAME,
		type: isFunction(type) ? type : String(type),
		props: props ? props : {},
		children: Array.isArray(children) ? children : [],
		component: null,
	};
}

/**
 * Check that value is a virtual node.
 * @param {*} value Checked value.
 * @return {boolean} Is it a virtual node?
 */
export function isVirtualNode (value) {
	return getTag(value) === TAG_NAME;
}
