import html from './html.js';
import Component from './component.js';
import updateElement from './update-element.js';
import defineComponent from './define-component.js';
import createVirtualNode from './create-virtual-node.js';

/**
 * Renders a virtual node into DOM element.
 * @param {VirtualNode} virtualNode Virtual DOM node.
 * @param {HTMLElement} parent Parent HTML element.
 */
function render (virtualNode, parent) {
	if (parent instanceof HTMLElement) {
		parent.innerHTML = '';
		updateElement(parent, virtualNode);
	}
}

export {
	html,
	render,
	Component,
	defineComponent as define,
	createVirtualNode,
};
