/**
 * The Knockout.js view model for the subject registration page.
 *
 * @ref https://github.com/beer-psi/hcmus-ctda-calendar
 * @author beer-psi
 */
interface DKHPViewModel {
  svDetails: KnockoutObservable<{
    MaSV?: number;
    MSSV: string;
    HoTen?: string;
    LoaiSV?: 'CTTT' | 'CLC';
    SoTCMax?: number;
    SoMonMax?: number;
    SoTCDaDK?: number;
    SoMonDaDK?: number;
  }>;
  errorMessage: KnockoutObservable<string>;
  dsDaDangKy: KnockoutObservableArray<Subject>;
  dsChuaDangKy: KnockoutObservableArray<Subject>;
  hasMonCaiThien: KnockoutObservable<boolean>;
  maxCredits: KnockoutObservable<string | undefined>;
  maxSubject: KnockoutObservable<string | undefined>;
  regCredits: KnockoutObservable<string | undefined>;
  regSubject: KnockoutObservable<string | undefined>;
  ok: KnockoutObservable<boolean>;
  loadDangKyHocPhan: () => any;
}

/**
 * An object containing a start date, and an end date.
 */
interface TimeSpan {
  start: Date;
  end: Date;
}

/**
 * An object containing start and end dates for the semester, alongside
 * any mid-semester breaks.
 *
 * Any breaks declared should be between the earliest start date, and the
 * latest end date.
 */
interface SemesterDates {
  theory: TimeSpan;
  practice: TimeSpan;
  breaks: Array<TimeSpan>;
}

/**
 * Object containing one single class time, alongside some metadata.
 *
 * A subject can have many `Timerow`s.
 */
interface Timerow {
  name: string;
  weekday: number;
  startHm: [number, number];
  endHm: [number, number];
  location: string | null;
  extras: Record<string, string>;
}

/**
 * An object containing information about a Subject, as returned by the
 * portal's API and its Knockout.js view model.
 */
interface Subject {
  Id: string;
  MaDKHP: number;
  MaMG: number;
  MaMH: number;
  KyHieu: string;
  TenMH: string;
  TenTA: string;
  TenTP: string;
  SoTinChi: number;
  MaLopSH: string;
  MaLopHP: string;
  SoSVDK: number;
  SoSVDaDK: string;
  HocBangTA: boolean;
  MaHeDT: number;
  LichHocLT: string;
  LichHocTH: string;
  MaNhomTH: number;
  GVLyThuyet: string;
  GVThucHanh: string;
  GVTroGiang: string | null;
  MonHocLai: boolean;
  MonCaiThien: boolean;
  MonHoanThi: boolean;
  GhiChu: string;
  HocKy: string;
}

/**
 * An object modelling a Semester, as returned by the portal's API and
 * the Knockout.js view model.
 */
interface Semester {
  MaHK: number;
  NamHoc: string;
  TenHK: string;
  ThuTuHK: number;
}

/**
 * The Knockout.js view model for the timetable page.
 */
interface KetQuaDKHPViewModel {
  dsKetQuaDKHP: KnockoutObservableArray<Subject>;
  dsHocKy: KnockoutObservableArray<Semester>;
  selectedMaHK: KnockoutObservable<number>;
}
