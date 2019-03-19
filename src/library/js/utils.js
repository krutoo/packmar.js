/**
 * Functions class names.
 * @type {Array<string>}
 */
const functionTags = Object.freeze([
	'Function',
	'AsyncFunction',
	'GeneratorFunction',
	'Proxy',
]);

/**
 * Check that value is a function.
 * @param {*} value Value.
 * @return {boolean} Is it a function?
 */
export function isFunction (value) {
	return functionTags.includes(getTag(value));
}

/**
 * Check that value is boolean.
 * @param {*} value Value.
 * @return {boolean} Is it boolean?
 */
export function isBoolean (value) {
	return getTag(value) === 'Boolean';
}

/**
 * Check that value is primitive.
 * @param {*} value Value to determine is it primitive.
 * @return {boolean} Is it primitive?
 */
export function isPrimitive (value) {
	return value !== Object(value);
}

/**
 * Return a tag of input value.
 * @param  {*} value Value to define it class.
 * @return {string} Name of class.
 */
export function getTag (value) {
	return Object.prototype.toString.call(value).slice(8, -1);
}
