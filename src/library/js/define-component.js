import { isFunction } from './utils.js';
import createVirtualNode from './create-virtual-node.js';

export const registry = new Map();

/**
 * Defines component creator function or class for use in html().
 * @param {string} name Name of component to use.
 * @param {Function} creator Component creator function or class.
 * @return {Function} Function that returns virtual DOM node.
 */
export default function defineComponent (name, creator) {
	const readyName = String(name).toUpperCase();
	let error = null;
	if (!readyName.includes('-')) {
		error = Error('Component name must contain "-" character');
	}
	if (!isFunction(creator)) {
		error = Error(`Component "${name}" must be a function`);
	}
	if (registry.has(readyName)) {
		error = Error(`Component "${name}" already defined`);
	}
	if (error) {
		throw error;
	} else {
		registry.set(readyName, creator);
		return options => createVirtualNode(creator, options || {});
	}
}
