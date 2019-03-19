import { isVirtualNode, createVirtualNode } from './virtualDom.js';

const templates = new Map();
const anchorsRegex = /{%\d*%}/;

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
	if ($node instanceof Element) {
		if ($node.childNodes.length > 0) {
			Array.from($node.childNodes).forEach($child => prepareAnchors($child));
		}
	} else if ($node instanceof Node && hasAnchors($node.nodeValue)) {
		const templateString = $node.nodeValue.replace(anchorsRegex, match => `<!--${match}-->`);
		const $template = createTemplate(templateString);
		if ($node.parentNode) {
			// need make array here, because insertBefore mutates "childNodes"
			for (const $child of [...$template.childNodes]) {
				$node.parentNode.insertBefore($child, $node);
			}
			$node.remove();
		}
	}
	return $node;
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
	if ($node instanceof Element) {
		const virtualNode = createVirtualNode($node.nodeName.toLowerCase());
		if ($node.childNodes.length > 0) {
			for (const $child of $node.childNodes) {
				if ($child instanceof Element) {
					virtualNode.children.push(convertToVirtualNode($child));
				} else if ($child instanceof Node && $child.nodeValue.trim()) {
					virtualNode.children.push($child.nodeValue);
				}
			}
		}
		if ($node.attributes.length > 0) {
			for (const attribute of $node.attributes) {
				const { name, value } = attribute;
				virtualNode.props[name] = value;
			}
		}
		result = virtualNode;
	} else if ($node instanceof Node) {
		result = $node.nodeValue;
	}
	return result;
}

/**
 * Returns a simple copy of virtual node. Don't clone props deeply.
 * @param {VirtualNode} virtualNode Virtual DOM node.
 * @return {VirtualNode} New Virtual DOM node.
 */
export function cloneVirtualNode (virtualNode) {
	let result = virtualNode;
	if (isVirtualNode(virtualNode)) {
		const { type, props, children } = virtualNode;
		const newNode = createVirtualNode(type, props, ...children.map(cloneVirtualNode));
		result = newNode;
	}
	return result;
}

/**
 * Replaces anchors by values in virtual DOM node (mutates node).
 * @param {VirtualNode} virtualNode Virtual DOM node.
 * @param {Object} values Values.
 * @return {VirtualNode} Mutated input virtual DOM node.
 */
export function passValues (virtualNode, values) {
	if (isVirtualNode(virtualNode) && values) {
		let { props, children } = virtualNode;
		for (const propName in props) {
			const propValue = props[propName];
			if (hasAnchors(propValue)) {
				props[propName] = values[propValue];
			}
		}
		for (let index = 0; index < children.length; index++) {
			const child = children[index];
			if (isVirtualNode(child)) {
				children.splice(index, 1, passValues(child, values));
			} else if (hasAnchors(child)) {
				const value = values[child];
				if (Array.isArray(value)) {
					children.splice(
						index,
						1,
						...value.map(item => passValues(item, values)).filter(Boolean),
					);
				} else if (value) {
					children.splice(index, 1, value);
				} else {
					children.splice(index, 1);
					index -= 1;
				}
			}
		}
	}
	return virtualNode;
}

/**
 * Check that string contains anchors (e.g. '{%2%}').
 * @param {string} value String to check it.
 * @return {boolean} True if string contains anchors.
 */
export function hasAnchors (value) {
	return anchorsRegex.test(value);
}
