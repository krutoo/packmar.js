import { insert } from './utils.js';
import { registry } from './define-component.js';
import { hasAnchors, replaceAnchors } from './pack.js';
import createVirtualNode, { isVirtualNode } from './create-virtual-node.js';

/**
 * Cache of created DOM elements. Map keys is html markup.
 * @type {Map}
 */
const templates = new Map();

/**
 * Returns a template by html string. Caches the result.
 * @param {string} html HTML markup.
 * @return {HTMLDivElement} Template with content created from html string.
 */
export function getTemplate (html) {
  const cacheKey = String(html).trim();
  let template;
  if (templates.has(cacheKey)) {
    template = templates.get(cacheKey);
  } else {
    // @todo maybe need prepare anchors in virtual nodes (for speed up)...
    template = prepareAnchors(createTemplate(cacheKey));
    templates.set(cacheKey, template);
  }
  return template;
}

/**
 * Replaces anchors (e.g. '{%0%}') by anchor-comments (e.g. '<!--{%0%}-->') in text content.
 * @param {Node} $node Element or node.
 * @return {Node} Mutated input node.
 */
export function prepareAnchors ($node) {
  if ($node instanceof HTMLElement) {
    if ($node.childNodes.length > 0) {
      Array.from($node.childNodes).forEach($child => prepareAnchors($child));
    }
  } else if ($node instanceof Node && hasAnchors($node.nodeValue)) {
    const templateString = replaceAnchors($node.nodeValue, makeCommentHTML);
    const $template = createTemplate(templateString);
    if ($node.parentNode) {
      // need make array here, because insertBefore mutates "childNodes"
      // @todo refactor with for loop (with update index before insertBefore() call)
      for (const $child of [...$template.childNodes]) {
        $node.parentNode.insertBefore($child, $node);
      }
      $node.remove();
    }
  }
  return $node;
}

/**
 * Returns comment HTML string.
 * @param {string} content Comment text.
 * @return {string} Comment HTML markup string.
 */
export function makeCommentHTML (content) {
  return `<!--${content}-->`;
}

/**
 * Returns a new HTMLDivElement with content, created from input html markup.
 * @param {string} html HTML markup.
 * @return {HTMLDivElement} Template.
 */
export function createTemplate (html) {
  const readyHTML = String(html || '').trim().replace(/\s+/g, ' ');
  const template = document.createElement('div');
  template.insertAdjacentHTML('afterBegin', readyHTML);
  return template;
}

/**
 * Returns a new virtual DOM node from input real DOM node.
 * @param {Node} $node Real DOM node.
 * @return {VirtualNode} Virtual DOM node.
 */
export function convertToVirtualNode ($node) {
  let result = '';
  if ($node instanceof HTMLElement) {
    const virtualNode = createVirtualNode(getVirtualType($node.nodeName));
    if ($node.childNodes.length > 0) {
      for (let childIndex = 0; childIndex < $node.childNodes.length; childIndex++) {
        const $child = $node.childNodes[childIndex];
        if ($child instanceof HTMLElement) {
          virtualNode.children.push(convertToVirtualNode($child));
        } else if ($child instanceof Node) {
          // prevent pass of first or last whitespace-only child
          const isFirstChild = childIndex === 0;
          const isLastChild = childIndex === $node.childNodes.length - 1;
          const isEmptyChild = !$child.nodeValue.trim();
          if (!isEmptyChild || isFirstChild || isLastChild) {
            virtualNode.children.push($child.nodeValue);
          }
        }
      }
    }
    if ($node.attributes.length > 0) {
      for (const attribute of $node.attributes) {
        const { name, value } = attribute;

        // for defined boolean attributes need to save true
        virtualNode.props[name] = value === '' ? true : value;
      }
    }
    result = virtualNode;
  } else if ($node instanceof Node) {
    result = $node.nodeValue;
  }
  return result;
}

/**
 * Returns a virtual DOM node type (defined components classes or functions).
 * @param {string} typeName Type name.
 * @return {(string|Function)} Virtual DOM node type.
 */
export function getVirtualType (typeName) {
  let result = typeName;
  if (registry.has(typeName)) {
    result = registry.get(typeName);
  }
  return result;
}

/**
 * Returns a simple copy of virtual node. Don't clone props deeply.
 * @param {VirtualNode} virtualNode Virtual DOM node.
 * @return {VirtualNode} New Virtual DOM node.
 */
export function cloneVirtualNode (virtualNode) {
  let clone = virtualNode;
  if (isVirtualNode(virtualNode)) {
    const { type, props, children } = virtualNode;
    const clonedChildren = [];
    for (let index = 0; index < children.length; index++) {
      clonedChildren.push(cloneVirtualNode(children[index]));
    }
    clone = createVirtualNode(type, { ...props }, ...clonedChildren);
  }
  return clone;
}

/**
 * Replaces anchors by values in virtual DOM node (mutates node).
 * @param {VirtualNode} virtualNode Virtual DOM node.
 * @param {Object} values Values.
 * @return {VirtualNode} Mutated input virtual DOM node.
 */
export function passValues (virtualNode, values) {
  if (isVirtualNode(virtualNode) && values) {
    const { props } = virtualNode;
    let { children } = virtualNode;
    for (const propName in props) {
      const propValue = props[propName];
      if (hasAnchors(propValue)) {
        props[propName] = values[propValue];
      }
    }
    for (let index = 0; index < children.length; index++) {
      // @todo maybe create new array and push() faster than splice()
      const child = children[index];
      if (isVirtualNode(child)) {
        passValues(child, values);
      } else if (hasAnchors(child)) {
        const value = values[child.trim()];
        if (Array.isArray(value)) {
          const childrenPart = [];
          for (let partIndex = 0; partIndex < value.length; partIndex++) {
            const listItem = value[partIndex];
            if (listItem) { // @todo isDisplayedPrimitive(value)
              childrenPart.push(passValues(listItem, values));
            }
          }
          children = insert(children, childrenPart, index, true);
          index += childrenPart.length;
        } else if (value) { // @todo isDisplayedPrimitive(value)
          children.splice(index, 1, value);
        } else {
          children.splice(index, 1);
          index--;
        }
      }
    }
    virtualNode.children = children;
  }
  return virtualNode;
}
