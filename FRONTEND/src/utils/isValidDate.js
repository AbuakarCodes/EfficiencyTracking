import dayjs from "dayjs";


export function isValidDate(dateStr) {
  const parsed = dayjs(dateStr, "YYYY/MM/DD", true);
  if (!parsed.isValid()) return false;

  const year = parsed.year();
  if (year < 1000 || year > 9999) return false;

  return true;
}

