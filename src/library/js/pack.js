/**
 * Tag for template literals. Returns the packed element.
 * @param {Array} strings String part of template literal.
 * @param {...*} values Values part.
 * @return {Object} Packed element.
 */
export default function pack (strings, ...values) {
	const parts = [];
	const valuesMap = {};
	for (let index = 0; index < strings.length; index++) {
		parts.push(strings[index]);
		if (values.hasOwnProperty(index)) {
			const anchor = getAnchor(valuesMap);
			valuesMap[anchor] = values[index];
			parts.push(anchor);
		}
	}
	const htmlString = parts.join('').trim();
	return Object.freeze({ htmlString, valuesMap });
}

/**
 * Returns anchor.
 * @param {Object} valuesMap Values map.
 * @return {string} Anchor for template.
 */
function getAnchor (valuesMap) {
	const length = Object.keys(valuesMap).length;
	const anchor = `{%${length}%}`;
	return anchor;
}
