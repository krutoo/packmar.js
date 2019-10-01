import { isVirtualNode } from './create-virtual-node.js';
import Component, { isComponentClass } from './component.js';
import { isFunction, isPrimitive, isBoolean } from './utils.js';

/**
 * Creates a real DOM node.
 * @param {*} virtualNode Virtual DOM node.
 * @param {HTMLElement} $parent Parent element to save in component.
 * @param {number} index Position in parent to save in component.
 * @return {Node} Real DOM node.
 */
export default function createNode (virtualNode, $parent, index = 0) {
  let $node;

  if (isVirtualNode(virtualNode)) {
    const { type, props, children } = virtualNode;

    if (isFunction(type)) {
      // @todo need refactoring here
      const { component: instance } = instantiate(virtualNode);

      instance.bound($parent, index);

      instance.previousVNode = instance.render(props);
      $node = createNode(instance.previousVNode, $parent, index);
    } else {
      $node = document.createElement(type);

      setProps($node, virtualNode);

      for (let childIndex = 0, realIndex = 0; childIndex < children.length; childIndex++) {
        const virtualChild = children[childIndex];
        if (virtualChild) {
          $node.appendChild(createNode(virtualChild, $node, realIndex));
          realIndex++;
        }
      }
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
 * Adds "component" prop to virtual DOM node with custom type.
 * @param {VirtualNode} virtualNode Virtual DOM node to add instance.
 * @return {VirtualNode} Mutated input virtual DOM node with instance.
 */
export function instantiate (virtualNode) {
  if (isVirtualNode(virtualNode)) {
    const { type, props } = virtualNode;
    let instance;
    if (isComponentClass(type)) {
      instance = new type(props);
    } else if (isFunction(type)) {
      instance = new Component(props);
      instance.render = type;
    }
    if (instance) {
      virtualNode.component = instance;
    }
  }
  return virtualNode;
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
      $target.setAttribute(name, value);
      $target[name] = value;
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
