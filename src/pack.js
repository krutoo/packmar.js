/**
 * @typedef {Object} Pack Packed element.
 * @property {string} template HTML template with passed values replaced by anchors.
 * @property {Object} values values for anchors in template.
 */

/**
 * Regex for search anchors in markup.
 * @type {string}
 */
const anchorsRegex = /{%\d*%}/g;

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

  return {
    template: parts.join('').trim().replace(/\s+/g, ' '),
    values: valuesMap,
  };
}

/**
 * Replaces all anchors by replacer.
 * @param {string} string String to replace anchors.
 * @param {(string|Function)} replacer Replacer.
 * @return {string} String with replaced anchors.
 */
export function replaceAnchors (string, replacer) {
  return String(string).replace(anchorsRegex, replacer);
}

/**
 * Check that string contains anchors (e.g. '{%2%}').
 * @param {string} value String to check it.
 * @return {boolean} True if string contains anchors.
 */
export function hasAnchors (value) {
  // do not use anchorsRegex.test here (because with global search it save lastIndex)
  return Boolean(String(value).match(anchorsRegex));
}
