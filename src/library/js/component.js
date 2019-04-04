import { getTag } from './utils.js';
import updateElement from './update-element.js';

/**
 * Component tag name.
 * @type {string}
 */
export const TAG_NAME = 'PackmarComponent';

/**
 * Base component class.
 */
export default class Component {
	/**
	 * Creates a components.
	 * @param {Object} props Properties.
	 * @param {HTMLElement} parent Parent DOM element.
	 * @param {number} index Index in parent.childNodes.
	 */
	constructor (props = {}) {
		this.state = {};
		this.props = { ...props };
	}

	/** @inheritDoc */
	get [Symbol.toStringTag] () {
		return TAG_NAME;
	}

	/**
	 * Should returns a virtual node.
	 * @abstract
	 */
	render () {
		throw new Error('Component class created without "render" method');
	}

	/**
	 * Saves parent element reference with index in child nodes to render.
	 * @param {HTMLElement} parent Parent HTML element.
	 * @param {number} index Index in parent child nodes list.
	 */
	bound (parent, index = 0) {
		this.parent = parent;
		this.index = index;
	}

	/**
	 * Updates state.
	 * @param {Object} newState New state part.
	 */
	setState (newState = {}) {
		this.state = { ...this.state, ...newState };
		updateComponentElement.call(this);
	}

	/**
	 * Updates props.
	 * @param {Object} newProps New props part.
	 */
	setProps (newProps) {
		this.props = { ...this.props, ...newProps };
		updateComponentElement.call(this);
	}
}

/**
 * Update element of component.
 */
export function updateComponentElement () {
	const previousVNode = this.previousVNode;
	const currentVNode = this.render();
	updateElement(
		this.parent,
		currentVNode,
		previousVNode,
		null,
		this.index,
	);
	this.previousVNode = currentVNode;
}

/**
 * Check that value is a component.
 * @param {*} value Checked value.
 * @return {boolean} Is it component?
 */
export function isComponent (value) {
	return getTag(value) === TAG_NAME;
}

/**
 * Check that value is a component class.
 * @param {*} value Checked value.
 * @return {boolean} Is it component class?
 */
export function isComponentClass (value) {
	return value && value.prototype && value.prototype.render;
}
