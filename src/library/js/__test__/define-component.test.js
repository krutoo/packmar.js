import defineComponent, { registry } from '../define-component.js';

describe('defineComponent()', () => {
	/**
	 * Test component.
	 */
	const testComponent = () => {};
	test('should throw invalid component name error', () => {
		expect(() => {
			defineComponent('invalid', testComponent);
		}).toThrow(new Error('Component name must contain "-" character'));
	});
	test('should throw invalid component type error', () => {
		expect(() => {
			defineComponent('test-component', null);
		}).toThrow(new TypeError('Component "test-component" must be a function'));
	});
	test('should throw already registered component error', () => {
		defineComponent('test-component', testComponent);
		expect(() => {
			defineComponent('test-component', testComponent);
		}).toThrow(new TypeError('Component "test-component" already defined'));
	});
	test('should add component to registry ', () => {
		expect(registry.has('MY-COMPONENT')).toBe(false);
		defineComponent('my-component', testComponent);
		expect(registry.has('MY-COMPONENT')).toBe(true);
	});
});
