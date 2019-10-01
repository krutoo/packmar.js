import { isPrimitive } from './utils.js';
import { isComponent } from './component.js';
import { isVirtualNode } from './create-virtual-node.js';
import createNode, { setProp, removeProp } from './create-node.js';

/**
 * Updates a real DOM element according to old and new versions of it virtual copy.
 * @param {HTMLElement} $parent Parent DOM element.
 * @param {VirtualNode} newNode New version of virtual DOM node.
 * @param {VirtualNode} [oldNode] Old version of virtual DOM node.
 * @param {number} [$children] List of $parent children.
 * @param {number} [index=0] Index of target node in parent list of child nodes.
 */
export default function updateElement (
  $parent,
  newNode,
  oldNode,
  $children,
  index = 0,
) {
  if ($parent instanceof HTMLElement) {
    /** @inheritDoc */
    const createRealNode = () => createNode(
      newNode,
      $parent,
      index,
    );
    const $target = $children
      ? $children[index]
      : $parent.childNodes[index];

    if (!oldNode && newNode) {
      if ($target) { // update real dom for non actual virtual dom version
        $parent.replaceChild(createRealNode(), $target);
      } else {
        $parent.appendChild(createRealNode());
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
        $parent.replaceChild(createRealNode(), $target);
      } else { // update real dom for non actual virtual dom version
        $parent.appendChild(createRealNode());
      }
    } else if (isVirtualNode(newNode)) {
      if (!$target) { // update real dom for non actual virtual dom version
        $parent.appendChild(createRealNode());
      } else {
        if (isComponent(oldNode.component)) {
          // move component link into new virtual node version and update props
          newNode.component = oldNode.component;
          newNode.component.setProps(newNode.props);
        } else {
          updateProps($target, newNode.props, oldNode.props);
          updateChildren($target, newNode.children, oldNode.children);
        }
      }
    }
  }
}

/**
 * Updates changed properties of real DOM element by old and new versions of virtual node props.
 * @param {HTMLElement} $target Target element.
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
