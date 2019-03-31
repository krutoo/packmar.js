import createVirtualNode, { isVirtualNode, TAG_NAME } from '../create-virtual-node.js';

describe('createVirtualNode()', () => {
	it('should return new empty virtual div', () => {
		expect(createVirtualNode('div')).toEqual({
			[Symbol.toStringTag]: TAG_NAME,
			type: 'div',
			props: {},
			children: [],
			component: null,
		});
	});
	it('should return new virtual p with text content', () => {
		expect(createVirtualNode('p', null, 'With great power', 'comes great responsibility')).toEqual({
			[Symbol.toStringTag]: TAG_NAME,
			type: 'p',
			props: {},
			children: ['With great power', 'comes great responsibility'],
			component: null,
		});
	});
	it('should return new virtual div with class and id', () => {
		expect(createVirtualNode('span', { class: 'test-class', id: 'test-id' })).toEqual({
			[Symbol.toStringTag]: TAG_NAME,
			type: 'span',
			props: { class: 'test-class', id: 'test-id' },
			children: [],
			component: null,
		});
	});
});

describe('isVirtualNode()', () => {
	it('should return true for virtual node', () => {
		expect(isVirtualNode(createVirtualNode('h1'))).toBe(true);
	});
	it('should return false for non virtual nodes', () => {
		[false, 1, '1', null, undefined, {}, [], () => {}].forEach(value => {
			expect(isVirtualNode(value)).toBe(false);
		});
	});
});
