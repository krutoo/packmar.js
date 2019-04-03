import { isPrimitive, isBoolean, isFunction } from './utils.js';
import { isComponent } from './component.js';
import { isVirtualNode } from './create-virtual-node.js';

/**
 * Updates a real DOM element according to old and new versions of it virtual copy.
 * @param {Element} $parent Parent DOM element.
 * @param {VirtualNode} newNode New version of virtual DOM node.
 * @param {VirtualNode} [oldNode] Old version of virtual DOM node.
 * @param {number} [$children] List of $parent children.
 * @param {number} [index=0] Index of target node in parent list of child nodes.
 */
export default function updateElement ($parent, newNode, oldNode, $children, index = 0) {
	if ($parent instanceof HTMLElement) {
		const $target = $children ? $children[index] : $parent.childNodes[index];
		if (!oldNode && newNode) {
			$parent.appendChild(createNode(newNode, $parent, index));
		} else if (!newNode && oldNode) {
			if ($target) {
				$parent.removeChild($target);

				// also for <textarea> need to remove value
				if ($parent instanceof HTMLTextAreaElement) {
					$parent.value = '';
				}
			}
		} else if (!isSameVirtualNodes(newNode, oldNode)) {
			if ($target) {
				$parent.replaceChild(createNode(newNode, $parent, index), $target);
			}
		} else if (isVirtualNode(newNode)) {
			if (isComponent(oldNode.component)) {
				// move link on component into new virtual DOM node version and update
				newNode.component = oldNode.component;
				newNode.component.setProps(newNode.props);
			} else {
				updateProps($target, newNode.props, oldNode.props);
				updateChildren($target, newNode.children, oldNode.children);
			}
		}
	}
}

/**
 * Updates changed properties of real DOM element by old and new versions of virtual node props.
 * @param {Element} $target Target element.
 * @param {Object} newProps Old properties.
 * @param {Object} oldProps New properties.
 */
export function updateProps ($target, newProps = {}, oldProps = {}) {
	if ($target instanceof HTMLElement && newProps && oldProps) {
		const props = { ...oldProps, ...newProps };
		for (const propName in props) {
			const newValue = newProps[propName];
			const oldValue = oldProps[propName];
			updateProp($target, propName, newValue, oldValue);
		}
	}
}

/**
 * Updates changed property of real DOM element by old and new versions.
 * @param {HTMLElement} $target Target element.
 * @param {string} propName Name of property.
 * @param {*} newValue New property version.
 * @param {*} oldValue Old property version.
 */
export function updateProp ($target, propName, newValue, oldValue) {
	if (!oldValue || newValue !== oldValue) {
		setProp($target, propName, newValue);
	} else if (!newValue && oldValue) {
		removeProp($target, propName, oldValue);
	}
}

/**
 * Updates children of real DOM element by new and old versions of virtual node children.
 * @param {HTMLElement} $parent Parent element.
 * @param {Array} newChildren New version of virtual DOM node children.
 * @param {Array} oldChildren Old version of virtual DOM node children.
 */
export function updateChildren ($parent, newChildren, oldChildren) {
	if (
		$parent instanceof HTMLElement
		&& Array.isArray(newChildren)
		&& Array.isArray(oldChildren)
	) {
		const maxLength = Math.max(newChildren.length, oldChildren.length);
		if (maxLength > 0) {
			// need create array here, because operations with $parent mutates "childNodes"
			const $children = [...$parent.childNodes];
			for (let childIndex = 0; childIndex < maxLength; childIndex++) {
				updateElement(
					$parent,
					newChildren[childIndex],
					oldChildren[childIndex],
					$children,
					childIndex,
				);
			}
		}
	}
}

/**
 * Creates a real DOM node.
 * @param {*} virtualNode Virtual DOM node.
 * @param {HTMLElement} $parent Parent element to save in component.
 * @param {number} index Position in parent to save in component.
 * @return {Node} Real DOM node.
 */
export function createNode (virtualNode, $parent, index = 0) {
	let $node;
	if (isVirtualNode(virtualNode)) {
		const { type, props, children } = virtualNode;

		// @todo add isComponentClass() helper to use here
		if (type && type.prototype && type.prototype.render) {
			// @todo move out instance creating logic from createNode()
			const instance = new type(props);
			instance.bound($parent, index);
			instance.previousVNode = instance.render();
			virtualNode.component = instance;
			$node = createNode(instance.previousVNode, $parent, index);
		} else {
			$node = document.createElement(type);
			setProps($node, virtualNode);

			// @todo replace on for of loop (for speed up)
			children.filter(Boolean).forEach((virtualChild, childIndex) => {
				$node.appendChild(createNode(virtualChild, $node, childIndex));
			});
		}
	} else if (isDisplayedPrimitive(virtualNode)) {
		// String() needs here to prevent Uncaught TypeError with symbol type values
		$node = document.createTextNode(String(virtualNode));
	} else {
		$node = document.createComment('empty');
	}
	return $node;
}

/**
 * Check that value is a displayed primitive (should be visible in markup).
 * @param {*} value Checked value.
 * @return {boolean} Is it a displayed primitive?
 */
export function isDisplayedPrimitive (value) {
	return isPrimitive(value)
		&& value !== null
		&& value !== false
		&& value !== undefined;
}

/**
 * Check that both arguments is same virtual nodes or primitives.
 * @param {*} first First checked value.
 * @param {*} second Second checked value.
 * @return {boolean} Are they the same virtual nodes?
 */
export function isSameVirtualNodes (first, second) {
	const values = [first, second];
	return (values.every(isVirtualNode) && first.type === second.type)
		|| (values.every(isPrimitive) && String(first) === String(second));
}

/**
 * Set properties to real DOM element by virtual DOM node.
 * @param {HTMLElement} $target Target element.
 * @param {VirtualNode} virtualNode Virtual DOM node.
 */
export function setProps ($target, virtualNode) {
	if (isVirtualNode(virtualNode)) {
		const { props } = virtualNode;
		for (const name in props) {
			const value = props[name];
			setProp($target, name, value);
		}
	}
}

/**
 * Set a property to real DOM element by name and value.
 * @param {HTMLElement} $target Target element.
 * @param {string} name Property name.
 * @param {*} value Property value.
 */
export function setProp ($target, name, value) {
	if ($target instanceof HTMLElement) {
		if (isFunction(value)) {
			$target[name] = value;
		} else if (isBoolean(value)) {
			if (value) {
				$target.setAttribute(name, '');
				$target[name] = true;
			} else {
				removeProp($target, name, value);
				$target[name] = false;
			}
		} else {
			if (name !== 'key') {
				$target.setAttribute(name, value);
				$target[name] = value;
			}
		}
	}
}

/**
 * Removes property of real DOM element by name.
 * @param {HTMLElement} $target Target element.
 * @param {string} propName Name of property.
 * @param {*} value Removed value.
 */
export function removeProp ($target, propName, value) {
	if ($target instanceof HTMLElement) {
		if (isFunction(value)) {
			$target[propName] = null;
		} else {
			$target.removeAttribute(propName);
		}
	}
}
