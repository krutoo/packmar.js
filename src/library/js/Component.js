const idAttributeName = 'data-compo-id';
const ids = new Map();

export default class Component {
	constructor (options) {
		ids.set(this, Math.random().toString(16).slice(2));
		this.options = { ...options };
		this.data = {};
	}

	get id () {
		return ids.get(this);
	}

	compile () {
		const oldElement = document.querySelector(`[${idAttributeName}="${this.id}"]`);
		const newElement = this.render(this.options);
		this.mark(newElement, this.id);
		this.patch(oldElement, newElement);
		return newElement;
	}

	mark (element, id) {
		element.setAttribute(idAttributeName, id);
	}

	update (newData, silent) {
		this.data = Object.assign(this.data, newData);
		if (!silent) {
			this.compile();
		}
	}

	patch (oldNode, newNode) {
		if (oldNode) {
			if (oldNode.hasChildNodes()) {
				[...oldNode.childNodes].forEach((oldChild, index) => {
					const newChild = Array.from(newNode ? newNode.childNodes : [])[index];
					this.patch(oldChild, newChild);
				});
				// а что если элементов стало больше когда передавали массив?
			}
			if (newNode) {
				if (this.isSameTypeNodes(newNode, oldNode)) {
					if (newNode instanceof Element) {
						this.patchAttributes(oldNode, newNode);
					} else {
						oldNode.nodeValue = newNode.nodeValue;
					}
				} else {
					oldNode.replaceWith(newNode.cloneNode(true));
				}
			} else {
				oldNode.remove();
			}
		}
	}

	isSameTypeNodes (node1, node2) {
		return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName;
	}

	patchAttributes (oldElement, newElement) {
		// атрибуты теперь смотреть не получится - затираются!
		[...oldElement.attributes].forEach(({ name }) => {
			if (oldElement.getAttribute(name) !== newElement.getAttribute(name)) {
				oldElement.removeAttribute(name);
			}
		});
		[...newElement.attributes].forEach(({ name, value }) => {
			if (oldElement.getAttribute(name) !== newElement.getAttribute(name)) {
				oldElement.setAttribute(name, value);
			}
		});
	}
}
