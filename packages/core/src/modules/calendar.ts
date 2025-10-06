/**
 * Module to export timetable into iCalendar format (.ics)
 * @ref https://github.com/beer-psi/hcmus-ctda-calendar/blob/trunk/script.js
 * @author beer-psi
 * Refactor by @yuran1811
 */

import {
  DAYS_OF_WEEK,
  LOCAL_TIMEZONE_FORMATTER,
  SEMESTER_DATES,
  TIMEZONE,
  UTC_TIMEZONE_FORMATTER,
} from '../constants/datetime';
import { formatIcalISO8601 } from '../utils/format';

export const exportTimetable = async () => {
  if (!$.alert) {
    const css = document.createElement('link');
    Object.assign(css, {
      rel: 'stylesheet',
      type: 'text/css',
    });
    const cssPromise = new Promise((resolve) =>
      css.addEventListener('load', resolve),
    );
    css.href = '/plugins/jquery-confirm/dist/jquery-confirm.min.css';
    document.head.appendChild(css);

    const tag = document.createElement('script');
    const scriptPromise = new Promise((resolve) =>
      tag.addEventListener('load', resolve),
    );
    tag.src = '/plugins/jquery-confirm/dist/jquery-confirm.min.js';
    document.head.appendChild(tag);

    await Promise.all([cssPromise, scriptPromise]);
  }

  const ICAL_ID = 'hcmus-calendar';
  const ICAL_PRODUCT = 'HCMUS Timetable Exporter';

  /**
   * Matches any of <br>, <br /> and more for various purposes,
   * such as splitting dates and lecturers.
   */
  const ANY_BR_TAG_REGEX = /<\s*br\s*(?:\/\s*)?>/gu;

  function wrapText(content: string, initialLineLength: number = 0) {
    const length = content.length;

    let processed = 75 - initialLineLength;
    let ret = content.substring(0, 75 - initialLineLength);

    while (processed < length) {
      const substr = content.substring(processed, processed + 75);
      ret += `\r\n ${substr}`;
      processed += 75;
    }

    return ret;
  }

  function* parseSchedule(
    schedule: string,
  ): Generator<Omit<Timerow, 'name' | 'extras'>> {
    const dates = schedule.split(ANY_BR_TAG_REGEX);

    for (const date of dates) {
      const match = date.match(
        /(?<dow>T[2-7]|CN) (?<start>\d{1,2}:\d{1,2})-(?<end>\d{1,2}:\d{1,2}) (?:\((?<class>.+?)\))?/,
      );

      if (!match || match.length !== 5) {
        throw new Error(`Schedule was not in correct format: ${date}`);
      }

      const [_, dayOfWeek, startHour, endHour, location] = match;
      const weekday = DAYS_OF_WEEK.indexOf(dayOfWeek);

      if (weekday === -1) throw new Error(`Unknown weekday: ${dayOfWeek}`);

      const startHm = startHour.split(':').map(Number) as [number, number];
      const endHm = endHour.split(':').map(Number) as [number, number];

      if (startHm.length !== 2)
        throw new Error(`Cannot parse start hour: ${startHour}`);
      if (endHm.length !== 2)
        throw new Error(`Cannot parse end time: ${endHour}`);

      yield {
        weekday,
        startHm,
        endHm,
        location: location ?? null,
      };
    }
  }

  /**
   * @source @bkalendar/core
   * @license MIT
   * Copyright (c) 2022 BKalendar
   */
  function dateOfIndex(
    hm: [number, number],
    startMondayUTC: Date,
    weekday: number,
  ) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    return new Date(
      // hm is in UTC+7
      // weekday is between 0-6
      +startMondayUTC + weekday * DAY + (hm[0] - 7) * HOUR + hm[1] * MINUTE,
    );
  }

  /**
   * Creates a copy of the provided date object, and add a number of
   * days into it. Returns the new date object, with the old one
   * unmodified.
   */
  function addDays(date: Date, days: number) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  /**
   * @source @bkalendar/core
   * @license MIT
   * Copyright (c) 2022 BKalendar
   */
  function formatTimerow(
    tr: Timerow,
    startMondayUTC: Date,
    endDate: Date,
    excludes: Array<TimeSpan> = [],
  ) {
    const extraEntries = Object.entries(tr.extras);
    const descriptionRow = [];

    if (extraEntries.length !== 0) {
      const description = extraEntries
        .map(([k, v]) => `${k}: ${v}`)
        .join('\\n');
      descriptionRow.push(`DESCRIPTION:${wrapText(description, 13)}`);
    }

    const rrules = [
      `RRULE:FREQ=WEEKLY;UNTIL=${formatIcalISO8601(endDate, UTC_TIMEZONE_FORMATTER)}`,
    ];
    const startDate = dateOfIndex(tr.startHm, startMondayUTC, tr.weekday);

    // Check if the weekly event coincides with any breaks, and add exceptions.
    if (excludes.length > 0) {
      let currentDate = startDate;
      let excludeCount = 0;

      while (currentDate < endDate) {
        if (
          excludes.some(
            (span) => span.start <= currentDate && currentDate <= span.end,
          )
        ) {
          if (excludeCount === 0) {
            rrules.push(`EXDATE;TZID=${TIMEZONE}`);
            rrules.push(
              ` :${formatIcalISO8601(currentDate, LOCAL_TIMEZONE_FORMATTER)}`,
            );
          } else {
            rrules.push(
              ` ,${formatIcalISO8601(currentDate, LOCAL_TIMEZONE_FORMATTER)}`,
            );
          }
          excludeCount++;
        }
        currentDate = addDays(currentDate, 7);
      }
    }

    const vevent = [
      'BEGIN:VEVENT',
      `UID:${crypto.randomUUID()}@${ICAL_ID}`,
      `DTSTAMP:${formatIcalISO8601(new Date(), UTC_TIMEZONE_FORMATTER)}`,

      `SUMMARY:${wrapText(tr.name, 9)}`,
      ...descriptionRow,
    ];

    if (tr.location !== null) {
      vevent.push(`LOCATION:${wrapText(tr.location, 10)}`);
    }

    vevent.push(
      `DTSTART;TZID=${TIMEZONE}:${formatIcalISO8601(
        dateOfIndex(tr.startHm, startMondayUTC, tr.weekday),
        LOCAL_TIMEZONE_FORMATTER,
      )}`,
      `DTEND;TZID=${TIMEZONE}:${formatIcalISO8601(
        dateOfIndex(tr.endHm, startMondayUTC, tr.weekday),
        LOCAL_TIMEZONE_FORMATTER,
      )}`,

      ...rrules,

      'END:VEVENT',
    );

    return vevent;
  }

  /**
   * Given a HTML string, returns its text content.
   */
  function deleteHTMLTags(content: string) {
    const div = document.createElement('div');
    div.innerHTML = content;
    const result = div.textContent;
    div.remove();
    return result ?? '';
  }

  if (document.location.pathname !== '/sinh-vien/ket-qua-dkhp') {
    $.alert({
      type: 'red',
      title: 'Wrong location',
      content:
        'You are in the wrong place. To export your timetable, go to https://portal.ctdb.hcmus.edu.vn/sinh-vien/ket-qua-dkhp.',
      buttons: {
        ok: {
          text: 'Take me there',
          btnClass: 'btn-blue',
          action: () => {
            document.location = '/sinh-vien/ket-qua-dkhp';
          },
        },
        cancel: {
          text: 'Cancel',
        },
      },
    });
    return;
  }

  const dkhpTable = document.querySelector('.ModCTDBSVKetQuaDKHPC');
  if (!dkhpTable) {
    $.alert({
      type: 'red',
      title: 'Could not find timetable',
      content:
        'Cannot export timetable if it does not exist. If you think this is an error, please <a href="https://github.com/beerpiss/hcmus-ctda-calendar/issues">contact the developer</a>.',
      buttons: {
        ok: {
          text: 'OK',
        },
      },
    });
    return;
  }

  const vmDKHP = ko.dataFor(dkhpTable) as KetQuaDKHPViewModel;
  const ketQuaDKHP = vmDKHP.dsKetQuaDKHP();

  console.log(`ketQuaDKHP: ${JSON.stringify(ketQuaDKHP)}`);

  if (ketQuaDKHP.length === 0) {
    $.alert({
      title: 'Nothing to export',
      content:
        'Seems like you have no subjects this semester. Have fun! If you think this is an error, please <a href="https://github.com/beerpiss/hcmus-ctda-calendar/issues">contact the developer</a>.',
      buttons: {
        ok: {
          text: 'OK',
        },
      },
    });
    return;
  }

  const ical = [
    'BEGIN:VCALENDAR',
    `PRODID:-//${ICAL_ID}//${ICAL_PRODUCT}//VI`,
    'VERSION:2.0',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Ho_Chi_Minh',
    'TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Ho_Chi_Minh',
    'X-LIC-LOCATION:Asia/Ho_Chi_Minh',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0700',
    'TZOFFSETTO:+0700',
    'TZNAME:+07',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];
  for (const subject of ketQuaDKHP) {
    if (!subject.LichHocLT && !subject.LichHocTH) {
      // Special case: Military Education does not have any times.
      continue;
    }

    let timerow: Timerow | null = null;
    const dates = SEMESTER_DATES[subject.HocKy as keyof typeof SEMESTER_DATES];

    if (!dates) {
      $.alert({
        type: 'red',
        title: 'Error',
        content: `Start and end dates for semester ${subject.HocKy} has not been added. Please <a href="https://github.com/beerpiss/hcmus-ctda-calendar/issues">contact the developer</a>.`,
        buttons: {
          ok: {
            text: 'OK',
          },
        },
      });
      return;
    }

    const commonExtras: Record<string, string> = {};

    if (subject.GVTroGiang) {
      commonExtras['Trợ giảng'] = subject.GVTroGiang.replace(
        ANY_BR_TAG_REGEX,
        ', ',
      );
    }

    if (subject.GhiChu) {
      commonExtras['Ghi chú'] = deleteHTMLTags(subject.GhiChu).replace(
        /^Ghi chú:\s*/,
        '',
      );
    }

    if (subject.LichHocLT) {
      const calendarTitle = `[${subject.KyHieu}] [LT] ${subject.TenMH}`;
      const extras: Record<string, string> = {};

      if (subject.GVLyThuyet) {
        extras['Giáo viên'] = subject.GVLyThuyet.replace(
          ANY_BR_TAG_REGEX,
          ', ',
        );
      }

      Object.assign(extras, commonExtras);

      for (const schedule of parseSchedule(subject.LichHocLT)) {
        timerow = {
          ...schedule,
          name: calendarTitle,
          extras,
        };
        ical.push(
          ...formatTimerow(
            timerow,
            dates.theory.start,
            dates.theory.end,
            dates.breaks,
          ),
        );
      }
    }

    if (subject.LichHocTH) {
      const calendarTitle = `[${subject.KyHieu}] [TH] ${subject.TenMH}`;
      const extras: Record<string, string> = {};

      if (subject.GVThucHanh) {
        extras['Giáo viên'] = subject.GVThucHanh.replace(
          ANY_BR_TAG_REGEX,
          ', ',
        );
      }

      Object.assign(extras, commonExtras);

      for (const schedule of parseSchedule(subject.LichHocTH)) {
        timerow = {
          ...schedule,
          name: calendarTitle,
          extras,
        };
        ical.push(
          ...formatTimerow(
            timerow,
            dates.practice.start,
            dates.practice.end,
            dates.breaks,
          ),
        );
      }
    }
  }
  ical.push('END:VCALENDAR');

  const calendar = ical.join('\r\n');

  const semesterCode = vmDKHP.selectedMaHK();
  const semesterList = vmDKHP.dsHocKy();

  const semester = semesterList.find((s) => s.MaHK === semesterCode);

  const filename = semester ? `${semester.TenHK}.ics` : 'Unknown Semester.ics';

  const anchor = document.createElement('a');
  anchor.href = `data:text/calendar,${encodeURIComponent(calendar)}`;
  anchor.download = filename;
  anchor.click();
  anchor.remove();
  toastr.success('The timetable was successfully exported.');
};

export default exportTimetable;
