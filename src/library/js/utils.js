/**
 * Return a class name of input value (true way to get it).
 * @param  {*} value Value to define it class.
 * @return {string} Name of class.
 */
export const classOf = value => Object.prototype.toString.call(value).slice(8, -1);
