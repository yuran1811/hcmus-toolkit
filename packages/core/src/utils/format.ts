/**
 * Formats a date with the provided formatter in ISO8601, without
 * any dashes or colons. Example: `20231005T094203`
 */
export function formatIcalISO8601(
  d: Date,
  formatter: Intl.DateTimeFormat,
): string {
  const parts: Partial<Record<Intl.DateTimeFormatPartTypes, string>> = {};

  for (const part of formatter.formatToParts(d)) {
    parts[part.type] = part.value;
  }

  return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`;
}
