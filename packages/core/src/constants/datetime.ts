/**
 * A mapping of semester codes to its beginning and ending dates.
 * @source https://www.ctda.hcmus.edu.vn/wp-content/uploads/2024/08/CTDA_Ke-hoach-nam-2024-2025.pdf
 * @source https://www.ctda.hcmus.edu.vn/wp-content/uploads/2025/08/CTDA_Ke-hoach-nam-2025-2026.pdf
 */
export const SEMESTER_DATES = {
  '1/24-25': {
    theory: {
      start: new Date('2024-09-30T00:00:00Z'),
      end: new Date('2024-12-15T00:00:00Z'),
    },
    practice: {
      start: new Date('2024-10-07T00:00:00Z'),
      end: new Date('2024-12-15T00:00:00Z'),
    },
    breaks: [
      {
        // Midterms
        start: new Date('2024-11-04T00:00:00Z'),
        end: new Date('2024-11-10T00:00:00Z'),
      },
    ],
  },
  '2/24-25': {
    theory: {
      start: new Date('2025-01-06T00:00:00Z'),
      end: new Date('2025-04-13T00:00:00Z'),
    },
    practice: {
      start: new Date('2025-01-13T00:00:00Z'),
      end: new Date('2025-04-13T00:00:00Z'),
    },
    breaks: [
      {
        // Lunar New Year
        start: new Date('2025-01-20T00:00:00Z'),
        end: new Date('2025-02-09T00:00:00Z'),
      },
      {
        // Midterms
        start: new Date('2025-03-03T00:00:00Z'),
        end: new Date('2025-03-09T00:00:00Z'),
      },
    ],
  },
  '3/24-25': {
    theory: {
      start: new Date('2025-05-12T00:00:00Z'),
      end: new Date('2025-08-17T00:00:00Z'),
    },
    practice: {
      start: new Date('2025-05-19T00:00:00Z'),
      end: new Date('2025-08-17T00:00:00Z'),
    },
    breaks: [
      {
        // Midterms + Admission
        start: new Date('2025-06-16T00:00:00Z'),
        end: new Date('2025-07-13T00:00:00Z'),
      },
    ],
  },
  '1/25-26': {
    theory: {
      start: new Date('2025-10-06T00:00:00Z'),
      end: new Date('2025-12-13T00:00:00Z'),
    },
    practice: {
      start: new Date('2025-10-13T00:00:00Z'),
      end: new Date('2025-12-13T00:00:00Z'),
    },
    breaks: [
      {
        // Midterms
        start: new Date('2025-11-10T00:00:00Z'),
        end: new Date('2025-11-15T00:00:00Z'),
      },
    ],
  },
  '2/25-26': {
    theory: {
      start: new Date('2026-01-12T00:00:00Z'),
      end: new Date('2026-04-18T00:00:00Z'),
    },
    practice: {
      start: new Date('2026-01-19T00:00:00Z'),
      end: new Date('2026-04-18T00:00:00Z'),
    },
    breaks: [
      {
        // Lunar New Year
        start: new Date('2026-02-09T00:00:00Z'),
        end: new Date('2026-02-28T00:00:00Z'),
      },
      {
        // Midterms
        start: new Date('2026-03-09T00:00:00Z'),
        end: new Date('2026-03-14T00:00:00Z'),
      },
    ],
  },
  '3/25-26': {
    theory: {
      start: new Date('2025-05-18T00:00:00Z'),
      end: new Date('2025-08-22T00:00:00Z'),
    },
    practice: {
      start: new Date('2025-05-25T00:00:00Z'),
      end: new Date('2025-08-22T00:00:00Z'),
    },
    breaks: [
      {
        // Midterms + Admission
        start: new Date('2025-06-22T00:00:00Z'),
        end: new Date('2025-07-11T00:00:00Z'),
      },
    ],
  },
};

export const TIMEZONE = 'Asia/Ho_Chi_Minh';

export const DAYS_OF_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const UTC_TIMEZONE_FORMATTER = new Intl.DateTimeFormat('vi-VN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'UTC',
});

export const LOCAL_TIMEZONE_FORMATTER = new Intl.DateTimeFormat('vi-VN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: TIMEZONE,
});
