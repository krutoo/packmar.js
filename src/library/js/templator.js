/**
 * Tag for template literals. Returns the packed element.
 * @param  {Array} strings String part of template literal.
 * @param  {...*} values Values part.
 * @return {Object} Packed element.
 */
export function pack (strings, ...values) {
	const parts = [];
	const valuesMap = {};
	for (let i = 0; i < strings.length; i++) {
		parts.push(strings[i]);
		if (values.hasOwnProperty(i)) {
			const anchor = getAnchor(valuesMap);
			valuesMap[anchor] = values[i];
			parts.push(anchor);
		}
	}
	const htmlString = parts.join('').trim();
	return { htmlString, valuesMap };
}

function getAnchor (valuesMap) {
	const length = Object.keys(valuesMap).length;
	const anchor = `{%${length}%}`;
	return anchor;
}
