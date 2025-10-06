/**
 * Formats a date with the provided formatter in ISO8601, without
 * any dashes or colons. Example: `20231005T094203`
 *
 * @param {Date} d
 * @param {Intl.DateTimeFormat} formatter
 * @returns {string}
 */
export declare function formatIcalISO8601(d: Date, formatter: Intl.DateTimeFormat): string;
