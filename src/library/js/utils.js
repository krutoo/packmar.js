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

/**
 * Returns a new array from two input.
 * @param {Array} target Target array to insert part.
 * @param {Array} part Part array.
 * @param {number} [position=0] Position to insertion.
 * @param {boolean} [withReplace=false] Need replace item in insert position?
 * @return {Array} New array.
 */
export function insert (target = [], part = [], position = 0, withReplace = false) {
  const readyPosition = Number(position) || 0;
  let result = [];
  if (Array.isArray(target) && Array.isArray(part)) {
    result = target.slice(0, readyPosition).concat(
      part,
      target.slice(readyPosition + (withReplace ? 1 : 0)),
    );
  }

  return result;
}
