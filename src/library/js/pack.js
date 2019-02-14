/**
 * @typedef {Object} Pack Packed element.
 * @property {string} template HTML template with passed values replaced by anchors.
 * @property {Object} values values for anchors in template.
 */

/**
 * Tag for template literals. Returns the packed element.
 * @param {Array} strings String part of template literal.
 * @param {...*} values Values part.
 * @return {Pack} Packed element.
 */
export default function pack (strings, ...values) {
	const parts = [];
	const valuesMap = {};
	let valuesMapLength = 0;
	for (let index = 0; index < strings.length; index++) {
		parts.push(strings[index]);
		if (index < values.length) {
			const anchor = `{%${valuesMapLength}%}`;
			valuesMapLength += 1;
			valuesMap[anchor] = values[index];
			parts.push(anchor);
		}
	}
	const template = parts.join('').trim().replace(/\s+/g, ' ');
	return { template, values: valuesMap };
}
