import { isPrimitive, isBoolean, isFunction } from './utils.js';

/**
 * @typedef {Object} VirtualNode Virtual DOM node.
 * @property {(string|Function)} type String (e.g. 'div', 'span') or function that returns virtual node.
 * @property {Object} props Properties.
 * @property {Array} children Children.
 */

/**
 * Updates a real DOM element according to old and new versions of it virtual copy.
 * @param {Element} $parent Parent DOM element.
 * @param {VirtualNode} newNode New version of virtual DOM node.
 * @param {VirtualNode} [oldNode] Old version of virtual DOM node.
 * @param {number} [$children] List of $parent children.
 * @param {number} [index=0] Index of target node in parent list of child nodes.
 */
export function updateElement ($parent, newNode, oldNode, $children, index = 0) {
	if ($parent instanceof Element) {
		$children = $children || $parent.childNodes;
		const $target = $children[index];
		if (!oldNode && newNode) {
			if ($target) {
				$parent.replaceChild(createNode(newNode), $target);
			} else {
				$parent.appendChild(createNode(newNode));
			}
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
				$parent.replaceChild(createNode(newNode), $target);
			}
		} else if (isVirtualNode(newNode)) {
			updateProps($target, newNode.props, oldNode.props);
			updateChildren($target, newNode.children, oldNode.children);
		}
	}
}

/**
 * Updates changed properties of real DOM element by old and new versions of virtual node props.
 * @param {Element} $target Target element.
 * @param {Object} newProps Old properties.
 * @param {Object} oldProps New properties.
 */
export function updateProps ($target, newProps, oldProps) {
	if ($target instanceof Element) {
		newProps = newProps || {};
		oldProps = oldProps || {};
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
 * @param {Element} $target Target element.
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
 * Removes property of real DOM element by name.
 * @param {Element} $target Target element.
 * @param {string} propName Name of property.
 * @param {*} value Removed value.
 */
export function removeProp ($target, propName, value) {
	if (isFunction(value)) {
		$target[propName] = null;
	} else {
		$target.removeAttribute(propName);
	}
}

/**
 * Updates children of real DOM element by new and old versions of virtual node children.
 * @param {Element} $parent Parent element.
 * @param {Array} newChildren New version of virtual DOM node children.
 * @param {Array} oldChildren Old version of virtual DOM node children.
 */
export function updateChildren ($parent, newChildren, oldChildren) {
	if (Array.isArray(newChildren) && Array.isArray(oldChildren)) {
		const maxLength = Math.max(newChildren.length, oldChildren.length);
		if (maxLength > 0) {
			// need create array here, because operations with $parent mutates "childNodes"
			const $children = $parent ? [...$parent.childNodes] : null;
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
 * @return {Node} Real DOM node.
 */
export function createNode (virtualNode) {
	let $node;
	if (isVirtualNode(virtualNode)) {
		const { type, props, children } = virtualNode;
		if (isFunction(type)) {
			$node = createNode(type({ ...props, children }));
		} else {
			$node = document.createElement(type);
			setProps($node, virtualNode);
			children.forEach(virtualChild => {
				$node.appendChild(createNode(virtualChild));
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
 * Set properties to real DOM element by virtual DOM node.
 * @param {Element} $target Target element.
 * @param {VirtualNode} virtualNode Virtual DOM node.
 */
export function setProps ($target, virtualNode) {
	if ($target instanceof Element && isVirtualNode(virtualNode)) {
		// @todo maybe change to for loop
		Object.entries(virtualNode.props).forEach(entry => {
			const [name, value] = entry;
			setProp($target, name, value);
		});
	}
}

/**
 * Set a property to real DOM element by name and value.
 * @param {Element} $target Target element.
 * @param {string} name Property name.
 * @param {*} value Property value.
 */
export function setProp ($target, name, value) {
	if ($target instanceof Element) {
		if (isFunction(value)) {
			$target[name] = value;
		} else if (isBoolean(value)) {
			if (value) {
				$target.setAttribute(name, '');
			} else {
				removeProp($target, name, value);
			}
		} else {
			$target.setAttribute(name, value);
		}
	}
}

/**
 * Returns a new virtual DOM node.
 * @param {(string|Function)} type Type.
 * @param {Object} props Properties.
 * @param  {...*} children Children.
 * @return {VirtualNode} New virtual DOM node.
 */
export function createVirtualNode (type, props, ...children) {
	return {
		type: isFunction(type) ? type : String(type),
		props: { ...props },
		children,
	};
}

/**
 * Check that value is a displayed primitive (should be visible in markup).
 * @param {*} value Checked value.
 * @return {boolean} Is it a displayed primitive?
 */
export function isDisplayedPrimitive (value) {
	return isPrimitive(value) && ![false, undefined, null].includes(value);
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
		|| (values.every(isPrimitive) && first === second);
}

/**
 * Check that value is a virtual node.
 * @param {*} value Checked value.
 * @return {boolean} Is it a virtual node?
 */
export function isVirtualNode (value) {
	return Boolean(value && value.type && value.props) && Array.isArray(value.children);
}
