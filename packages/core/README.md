# @hcmus-toolkit/core

## Introduction

Inspired by [BKalendar](https://bkalendar.github.io) and [hcmus-ctda-calendar](https://github.com/beer-psi/hcmus-ctda-calendar)

Exports your timetable from the [HCMUS CTDA Portal](https://portal.ctdb.hcmus.edu.vn) to the iCalendar format,
for importing into popular calendar apps like [Google Calendar](https://support.google.com/calendar/answer/37118)
or [Outlook](https://support.microsoft.com/en-us/office/import-calendars-into-outlook-8e8364e1-400e-4c0f-a573-fe76b5a2d379).

## Usage

On the [timetable page](https://portal.ctdb.hcmus.edu.vn/sinh-vien/ket-qua-dkhp),
paste this script into the browser's DevTools console:

```js
((d, l) => {
  if (
    l.host === 'portal.ctdb.hcmus.edu.vn' &&
    l.pathname === '/sinh-vien/ket-qua-dkhp'
  ) {
    d.body.appendChild(d.createElement('script')).src =
      `https://raw.githubusercontent.com/yuran1811/hcmus-toolkit/refs/heads/trunk/packages/core/dist/core.umd.cjs`;
  }
})(document, location);
```

The exported iCalendar file will be in your downloads folder.

For convenience, you can also save [this bookmarklet](<javascript:void((d,l)=%3E{if(l.host==='portal.ctdb.hcmus.edu.vn'&&l.pathname==='/sinh-vien/ket-qua-dkhp')d.body.appendChild(d.createElement('script')).src='https://raw.githubusercontent.com/yuran1811/hcmus-toolkit/refs/heads/trunk/packages/core/dist/core.umd.cjs')(document,location)>)
and execute it every time you want to export the timetable.
