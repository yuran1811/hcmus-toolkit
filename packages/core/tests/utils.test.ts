import { describe, expect, it } from 'vitest';

import { LOCAL_TIMEZONE_FORMATTER } from '../src/constants/datetime';
import { formatIcalISO8601 } from '../src/utils/format';

describe('@hcmus-toolkit/core', () => {
  describe('format', () => {
    describe('formatIcalISO8601', () => {
      it('should format correctly', () => {
        const date = new Date('2023-10-01T12:00:00Z');
        expect(formatIcalISO8601(date, LOCAL_TIMEZONE_FORMATTER)).toBe(
          '20231001T190000',
        );
      });
    });
  });
});
