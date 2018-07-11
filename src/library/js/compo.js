const idAttributeName = 'data-compo-id';

templates = new Map();
baseNodes = new Map();

export default class Compo {
	constructor (options) {
		this.data = {};
		this.options = options || {};
		this._id = Math.random().toString(16).slice(2);
	}

	get baseNode () {
		const oldTemplate = templates.get(this.constructor),
			newTemplate = this.template(this.options);
		let baseNode = baseNodes.get(this.constructor);
		if (!baseNode || oldTemplate !== newTemplate) {
			baseNode = this._createNode(newTemplate);
			baseNodes.set(this.constructor, baseNode);
			templates.set(this.constructor, newTemplate);
		}
		return baseNode;
	}

	render (options) {
		this._values = {};
		this.update({}, options, true);
		const newElement = this.baseNode.cloneNode(true),
			oldElement = document.querySelector(`[${idAttributeName}="${this._id}"]`);
		this.template(this.options);
		this._process(newElement, this._values);
		this._patch(oldElement, newElement);
		return newElement;
	}

	_process (node, values) {
		if (node.childNodes.length) {
			Array.from(node.childNodes).forEach(child => this._process(child, values));
		}
		if (node instanceof Element) {
			this._processAttributes(node, values);
		} else if (node instanceof Node) {
			const key = `<!--${node.nodeValue}-->`;
			if (Object.keys(values).includes(key)) {
				const value = values[key];
				let newNode;
				if (value instanceof Component) {
					newNode = values[key].render();
				} else if (value || typeof value === 'number') {
					newNode = this._createNode(values[key]);
				}
				node.parentNode.replaceChild(newNode || node, node);
			}
		}
	}

	_processAttributes (node, values) {
		Array.from(node.attributes).forEach(({ name, value }) => {
			if (Object.keys(values).includes(value)) {
				node.setAttribute(name, values[value]);
				// don't draw callbacks in HTML
				if (name.search(/on/) === 0) {
					node.removeAttribute(name);
					node[name] = values[value] || '';
				}
				// remove falsy boolean attributes
				if (!values[value] && typeof values[value] !== 'number') {
					node.removeAttribute(name);
				}
			}
		});
	}

	update (newData, newOptions, silent) {
		this.data = Object.assign(this.data, newData);
		this.options = Object.assign(this.options, newOptions);
		if (!silent) {
			this.render();
		}
	}

	_patch (oldElement, newElement) {
		if (oldElement) {
			if (oldElement.childNodes.length) {
				Array.from(oldElement.childNodes).forEach((oldChild, index) => {
					const newChild = Array.from(newElement ? newElement.childNodes : [])[index];
					this._patch(oldChild, newChild);
				});
			}
			if (newElement) {
				if (this._isSameTypeNodes(newElement, oldElement)) {
					if (newElement instanceof Element) {
						this._patchAttributes(oldElement, newElement);
					} else {
						oldElement.nodeValue = newElement.nodeValue;
					}
				} else {
					oldElement.parentNode.replaceChild(newElement.cloneNode(true), oldElement);
				}
			} else {
				oldElement.remove();
			}
		}
	}

	_patchAttributes (oldElement, newElement) {
		Array.from(oldElement.attributes).forEach(({ name }) => {
			oldElement[name] = null;
			oldElement.removeAttribute(name);
		});
		Array.from(newElement.attributes).forEach(({ name, value }) => {
			if (value) {
				oldElement[name] = value;
				oldElement.setAttribute(name, value);
			}
		});
	}

	_isSameTypeNodes (node1, node2) {
		return node1.nodeType === node2.nodeType && node1.tagName === node2.tagName;
	}

	_createNode (htmlString) {
		const temporaryElement = document.createElement('div'),
			template = String(htmlString || '').trim();
		temporaryElement.insertAdjacentHTML('afterbegin', template);
		const newNode = temporaryElement.firstChild;
		if (newNode instanceof Element) {
			this._setId(newNode, this._id);
		}
		return newNode;
	}

	_setId (element, id) {
		element.setAttribute(idAttributeName, id);
	}

	html (strings, ...values) {
		const html = [];
		for (let i = 0; i < Math.max(strings.length, values.length); i++) {
			html.push(strings[i]);
			if (values.hasOwnProperty(i)) {
				html.push(this._processValue(values[i]));
			}
		}
		return html.join('').trim();
	}

	_processValue (value) {
		const length = Object.keys(this._values).length;
		// @todo _values must be an array
		const key = `<!--{{${length}}}-->`;
		this._values[key] = value;
		return key;
	}
}
