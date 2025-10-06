import { describe, expect, it } from 'vitest';

import { todo } from '../src/main';

describe('@hcmus-toolkit/common', () => {
  describe('todo function', () => {
    it('should work correctly', () => {
      expect(todo()).toBe('todo');
    });
  });
});
