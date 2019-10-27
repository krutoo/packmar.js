import createVirtualNode from '../create-virtual-node.js';
import { isSameVirtualNodes } from '../update-element.js';

describe('isSameVirtualNodes()', () => {
  it('should return true for same primitives', () => {
    expect(isSameVirtualNodes(1, '1')).toBe(true);
    expect(isSameVirtualNodes(1, 1)).toBe(true);
    expect(isSameVirtualNodes(1, 2)).toBe(false);
    expect(isSameVirtualNodes(undefined, null)).toBe(false);
    expect(isSameVirtualNodes(false, null)).toBe(false);
    expect(isSameVirtualNodes(false, {})).toBe(false);
  });
  it('should return true for same type virtual nodes', () => {
    const div1 = createVirtualNode('div');
    const div2 = createVirtualNode('div', null, 'test div 2');
    const span = createVirtualNode('span', null, 'test div 2');
    expect(isSameVirtualNodes(div1, div1)).toBe(true);
    expect(isSameVirtualNodes(span, span)).toBe(true);
    expect(isSameVirtualNodes(div1, div2)).toBe(true);
    expect(isSameVirtualNodes(div1, span)).toBe(false);
  });
});
