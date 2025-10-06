const j = {
  "1/24-25": {
    theory: {
      start: /* @__PURE__ */ new Date("2024-09-30T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2024-12-15T00:00:00Z")
    },
    practice: {
      start: /* @__PURE__ */ new Date("2024-10-07T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2024-12-15T00:00:00Z")
    },
    breaks: [
      {
        // Midterms
        start: /* @__PURE__ */ new Date("2024-11-04T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2024-11-10T00:00:00Z")
      }
    ]
  },
  "2/24-25": {
    theory: {
      start: /* @__PURE__ */ new Date("2025-01-06T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-04-13T00:00:00Z")
    },
    practice: {
      start: /* @__PURE__ */ new Date("2025-01-13T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-04-13T00:00:00Z")
    },
    breaks: [
      {
        // Lunar New Year
        start: /* @__PURE__ */ new Date("2025-01-20T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2025-02-09T00:00:00Z")
      },
      {
        // Midterms
        start: /* @__PURE__ */ new Date("2025-03-03T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2025-03-09T00:00:00Z")
      }
    ]
  },
  "3/24-25": {
    theory: {
      start: /* @__PURE__ */ new Date("2025-05-12T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-08-17T00:00:00Z")
    },
    practice: {
      start: /* @__PURE__ */ new Date("2025-05-19T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-08-17T00:00:00Z")
    },
    breaks: [
      {
        // Midterms + Admission
        start: /* @__PURE__ */ new Date("2025-06-16T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2025-07-13T00:00:00Z")
      }
    ]
  },
  "1/25-26": {
    theory: {
      start: /* @__PURE__ */ new Date("2025-10-06T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-12-13T00:00:00Z")
    },
    practice: {
      start: /* @__PURE__ */ new Date("2025-10-13T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-12-13T00:00:00Z")
    },
    breaks: [
      {
        // Midterms
        start: /* @__PURE__ */ new Date("2025-11-10T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2025-11-15T00:00:00Z")
      }
    ]
  },
  "2/25-26": {
    theory: {
      start: /* @__PURE__ */ new Date("2026-01-12T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2026-04-18T00:00:00Z")
    },
    practice: {
      start: /* @__PURE__ */ new Date("2026-01-19T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2026-04-18T00:00:00Z")
    },
    breaks: [
      {
        // Lunar New Year
        start: /* @__PURE__ */ new Date("2026-02-09T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2026-02-28T00:00:00Z")
      },
      {
        // Midterms
        start: /* @__PURE__ */ new Date("2026-03-09T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2026-03-14T00:00:00Z")
      }
    ]
  },
  "3/25-26": {
    theory: {
      start: /* @__PURE__ */ new Date("2025-05-18T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-08-22T00:00:00Z")
    },
    practice: {
      start: /* @__PURE__ */ new Date("2025-05-25T00:00:00Z"),
      end: /* @__PURE__ */ new Date("2025-08-22T00:00:00Z")
    },
    breaks: [
      {
        // Midterms + Admission
        start: /* @__PURE__ */ new Date("2025-06-22T00:00:00Z"),
        end: /* @__PURE__ */ new Date("2025-07-11T00:00:00Z")
      }
    ]
  }
}, v = "Asia/Ho_Chi_Minh", L = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"], A = new Intl.DateTimeFormat("vi-VN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1,
  timeZone: "UTC"
}), R = new Intl.DateTimeFormat("vi-VN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1,
  timeZone: v
});
function Z(T, r) {
  const t = {};
  for (const a of r.formatToParts(T))
    t[a.type] = a.value;
  return `${t.year}${t.month}${t.day}T${t.hour}${t.minute}${t.second}`;
}
const U = async () => {
  if (!$.alert) {
    const e = document.createElement("link");
    Object.assign(e, {
      rel: "stylesheet",
      type: "text/css"
    });
    const o = new Promise(
      (i) => e.addEventListener("load", i)
    );
    e.href = "/plugins/jquery-confirm/dist/jquery-confirm.min.css", document.head.appendChild(e);
    const n = document.createElement("script"), s = new Promise(
      (i) => n.addEventListener("load", i)
    );
    n.src = "/plugins/jquery-confirm/dist/jquery-confirm.min.js", document.head.appendChild(n), await Promise.all([o, s]);
  }
  const T = "hcmus-calendar", r = "HCMUS Timetable Exporter", t = /<\s*br\s*(?:\/\s*)?>/gu;
  function a(e, o = 0) {
    const n = e.length;
    let s = 75 - o, i = e.substring(0, 75 - o);
    for (; s < n; ) {
      const c = e.substring(s, s + 75);
      i += `\r
 ${c}`, s += 75;
    }
    return i;
  }
  function* m(e) {
    const o = e.split(t);
    for (const n of o) {
      const s = n.match(
        /(?<dow>T[2-7]|CN) (?<start>\d{1,2}:\d{1,2})-(?<end>\d{1,2}:\d{1,2}) (?:\((?<class>.+?)\))?/
      );
      if (!s || s.length !== 5)
        throw new Error(`Schedule was not in correct format: ${n}`);
      const [i, c, l, N, I] = s, u = L.indexOf(c);
      if (u === -1) throw new Error(`Unknown weekday: ${c}`);
      const b = l.split(":").map(Number), y = N.split(":").map(Number);
      if (b.length !== 2)
        throw new Error(`Cannot parse start hour: ${l}`);
      if (y.length !== 2)
        throw new Error(`Cannot parse end time: ${N}`);
      yield {
        weekday: u,
        startHm: b,
        endHm: y,
        location: I ?? null
      };
    }
  }
  /**
   * @source @bkalendar/core
   * @license MIT
   * Copyright (c) 2022 BKalendar
   */
  function O(e, o, n) {
    return new Date(
      // hm is in UTC+7
      // weekday is between 0-6
      +o + n * 864e5 + (e[0] - 7) * 36e5 + e[1] * 6e4
    );
  }
  function k(e, o) {
    const n = new Date(e.valueOf());
    return n.setDate(e.getDate() + o), n;
  }
  /**
   * @source @bkalendar/core
   * @license MIT
   * Copyright (c) 2022 BKalendar
   */
  function p(e, o, n, s = []) {
    const i = Object.entries(e.extras), c = [];
    if (i.length !== 0) {
      const u = i.map(([b, y]) => `${b}: ${y}`).join("\\n");
      c.push(`DESCRIPTION:${a(u, 13)}`);
    }
    const l = [
      `RRULE:FREQ=WEEKLY;UNTIL=${Z(n, A)}`
    ], N = O(e.startHm, o, e.weekday);
    if (s.length > 0) {
      let u = N, b = 0;
      for (; u < n; )
        s.some(
          (y) => y.start <= u && u <= y.end
        ) && (b === 0 ? (l.push(`EXDATE;TZID=${v}`), l.push(
          ` :${Z(u, R)}`
        )) : l.push(
          ` ,${Z(u, R)}`
        ), b++), u = k(u, 7);
    }
    const I = [
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}@${T}`,
      `DTSTAMP:${Z(/* @__PURE__ */ new Date(), A)}`,
      `SUMMARY:${a(e.name, 9)}`,
      ...c
    ];
    return e.location !== null && I.push(`LOCATION:${a(e.location, 10)}`), I.push(
      `DTSTART;TZID=${v}:${Z(
        O(e.startHm, o, e.weekday),
        R
      )}`,
      `DTEND;TZID=${v}:${Z(
        O(e.endHm, o, e.weekday),
        R
      )}`,
      ...l,
      "END:VEVENT"
    ), I;
  }
  function g(e) {
    const o = document.createElement("div");
    o.innerHTML = e;
    const n = o.textContent;
    return o.remove(), n ?? "";
  }
  if (document.location.pathname !== "/sinh-vien/ket-qua-dkhp") {
    $.alert({
      type: "red",
      title: "Wrong location",
      content: "You are in the wrong place. To export your timetable, go to https://portal.ctdb.hcmus.edu.vn/sinh-vien/ket-qua-dkhp.",
      buttons: {
        ok: {
          text: "Take me there",
          btnClass: "btn-blue",
          action: () => {
            document.location = "/sinh-vien/ket-qua-dkhp";
          }
        },
        cancel: {
          text: "Cancel"
        }
      }
    });
    return;
  }
  const D = document.querySelector(".ModCTDBSVKetQuaDKHPC");
  if (!D) {
    $.alert({
      type: "red",
      title: "Could not find timetable",
      content: 'Cannot export timetable if it does not exist. If you think this is an error, please <a href="https://github.com/beerpiss/hcmus-ctda-calendar/issues">contact the developer</a>.',
      buttons: {
        ok: {
          text: "OK"
        }
      }
    });
    return;
  }
  const E = ko.dataFor(D), f = E.dsKetQuaDKHP();
  if (console.log(`ketQuaDKHP: ${JSON.stringify(f)}`), f.length === 0) {
    $.alert({
      title: "Nothing to export",
      content: 'Seems like you have no subjects this semester. Have fun! If you think this is an error, please <a href="https://github.com/beerpiss/hcmus-ctda-calendar/issues">contact the developer</a>.',
      buttons: {
        ok: {
          text: "OK"
        }
      }
    });
    return;
  }
  const h = [
    "BEGIN:VCALENDAR",
    `PRODID:-//${T}//${r}//VI`,
    "VERSION:2.0",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Ho_Chi_Minh",
    "TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Ho_Chi_Minh",
    "X-LIC-LOCATION:Asia/Ho_Chi_Minh",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0700",
    "TZOFFSETTO:+0700",
    "TZNAME:+07",
    "DTSTART:19700101T000000",
    "END:STANDARD",
    "END:VTIMEZONE"
  ];
  for (const e of f) {
    if (!e.LichHocLT && !e.LichHocTH)
      continue;
    let o = null;
    const n = j[e.HocKy];
    if (!n) {
      $.alert({
        type: "red",
        title: "Error",
        content: `Start and end dates for semester ${e.HocKy} has not been added. Please <a href="https://github.com/beerpiss/hcmus-ctda-calendar/issues">contact the developer</a>.`,
        buttons: {
          ok: {
            text: "OK"
          }
        }
      });
      return;
    }
    const s = {};
    if (e.GVTroGiang && (s["Trợ giảng"] = e.GVTroGiang.replace(
      t,
      ", "
    )), e.GhiChu && (s["Ghi chú"] = g(e.GhiChu).replace(
      /^Ghi chú:\s*/,
      ""
    )), e.LichHocLT) {
      const i = `[${e.KyHieu}] [LT] ${e.TenMH}`, c = {};
      e.GVLyThuyet && (c["Giáo viên"] = e.GVLyThuyet.replace(
        t,
        ", "
      )), Object.assign(c, s);
      for (const l of m(e.LichHocLT))
        o = {
          ...l,
          name: i,
          extras: c
        }, h.push(
          ...p(
            o,
            n.theory.start,
            n.theory.end,
            n.breaks
          )
        );
    }
    if (e.LichHocTH) {
      const i = `[${e.KyHieu}] [TH] ${e.TenMH}`, c = {};
      e.GVThucHanh && (c["Giáo viên"] = e.GVThucHanh.replace(
        t,
        ", "
      )), Object.assign(c, s);
      for (const l of m(e.LichHocTH))
        o = {
          ...l,
          name: i,
          extras: c
        }, h.push(
          ...p(
            o,
            n.practice.start,
            n.practice.end,
            n.breaks
          )
        );
    }
  }
  h.push("END:VCALENDAR");
  const S = h.join(`\r
`), H = E.selectedMaHK(), w = E.dsHocKy().find((e) => e.MaHK === H), M = w ? `${w.TenHK}.ics` : "Unknown Semester.ics", C = document.createElement("a");
  C.href = `data:text/calendar,${encodeURIComponent(S)}`, C.download = M, C.click(), C.remove(), toastr.success("The timetable was successfully exported.");
};
class x {
  $fetch;
  constructor(r) {
    this.$fetch = r;
  }
  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param url the endpoint url
   * @param method the HTTP method (GET, POST, ...)
   * @param params the request parameters (body, options)
   * @returns A promise that resolves to the response data
   */
  async call(r, t, {
    body: a,
    options: m
  } = {}) {
    return this.$fetch(r, { method: t, body: a, ...m });
  }
}
class K extends x {
  RESOURCE = "https://portal.ctdb.hcmus.edu.vn/dang-ky-hoc-phan";
  HEADERS = {
    Cookie: document.cookie,
    "X-OFFICIAL-REQUEST": "TRUE",
    "X-Requested-With": "XMLHttpRequest"
  };
  getResourceUrl(...r) {
    return this.RESOURCE + (r.length > 0 ? `/${r.join("/")}` : "");
  }
  async addSubject(r, t) {
    const a = new FormData();
    return a.append("action", "addMonDangKy"), a.append("data", t.toString()), this.call(this.getResourceUrl(`sinh-vien-${r}`), "POST", {
      body: a,
      options: {
        headers: { ...this.HEADERS }
      }
    });
  }
  async removeSubject(r, t) {
    const a = new FormData();
    return a.append("action", "delMonDangKy"), a.append("data", t.toString()), this.call(this.getResourceUrl(`sinh-vien-${r}`), "POST", {
      body: a,
      options: {
        headers: { ...this.HEADERS }
      }
    });
  }
  async getSubjectList(r, t) {
    const a = new FormData();
    return a.append("action", "loadDangKyHocPhan"), a.append("data", t.toString()), this.call(this.getResourceUrl(`sinh-vien-${r}`), "POST", {
      body: a,
      options: {
        headers: { ...this.HEADERS }
      }
    });
  }
}
const P = async (T, ...r) => {
  if (!["apcs", "clc"].map((D) => `/dang-ky-hoc-phan/sinh-vien-${D}`).includes(T))
    return;
  const t = document.querySelector(".ModCTDBDKHocPhanC");
  if (!t) return;
  const a = t.querySelector("#divMonChuaDK table tbody");
  if (!a) return;
  const m = ko.dataFor(t);
  if (!m) return;
  new MutationObserver((D) => {
    for (const E of D)
      for (const f of E.addedNodes) {
        if (f.nodeName !== "TR") continue;
        const h = f, S = h.querySelectorAll("td")[1];
        if (!S) continue;
        const H = ko.dataFor(h);
        S.textContent += ` (${H.MaMG})`;
      }
  }).observe(a, { childList: !0 });
  let k = 0;
  const p = document.createElement("textarea");
  p.placeholder = "Enter internal subject IDs (shown in parentheses) separated by whitespace.", p.value = localStorage.getItem("registeredSubjectIDs") ?? "", p.addEventListener("keyup", () => {
    k && clearTimeout(k), k = setTimeout(() => {
      localStorage.setItem("registeredSubjectIDs", p.value);
    }, 1e3);
  });
  const g = document.createElement("button");
  g.textContent = "Bulk register subjects", g.onclick = async (D) => {
    D.preventDefault();
    const E = p.value.split(/\s+/gu).map((d) => Number(d)).concat(r.map((d) => Number(d))), f = m.dsChuaDangKy().map((d) => d.MaMG), h = E.filter(
      (d) => f.includes(d)
    );
    if (h.length === 0) {
      toastr.warning("No valid subjects entered.");
      return;
    }
    const S = T.split("-").pop(), H = await Promise.allSettled(
      h.map((d) => new K(fetch).addSubject(S, d))
    );
    if (m.loadDangKyHocPhan(), H.some((d) => d.status === "rejected")) {
      const d = H.filter((w) => w.status === "rejected").map((w) => w.reason.Message);
      $.alert({
        type: "red",
        title: "Could not register some subjects",
        content: d.join("<br>"),
        buttons: {
          ok: {
            text: "Ok"
          }
        }
      });
    } else
      toastr.success("Successfully registered subjects.");
  }, t.querySelector(".panel .panel-body")?.insertAdjacentElement("beforeend", p), t.querySelector(".panel .panel-body")?.insertAdjacentElement("beforeend", document.createElement("br")), t.querySelector(".panel .panel-body")?.insertAdjacentElement("beforeend", g), localStorage.getItem("registeredSubjectIDs") && m.ok() && setTimeout(() => g.click(), 1500);
};
export {
  P as autoRegistration,
  U as exportTimetable
};
