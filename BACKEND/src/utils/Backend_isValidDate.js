import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

/**
 * Checks if a date string is valid according to a strict format.
 * Does NOT coerce or guess.
 * @param {string} dateStr - The raw input date
 * @param {string} format - The expected date format (default: 'YYYY-MM-DD')
 * @returns {boolean} true if valid, false otherwise
 */
export function Backend_isValidDate(dateStr, format = "YYYY-MM-DD") {
  // 1. Check raw format with regex
  const regexMap = {
    "YYYY-MM-DD": /^\d{4}-\d{2}-\d{2}$/,
    "DD-MM-YYYY": /^\d{2}-\d{2}-\d{4}$/,
    // Add more formats if needed
  };

  if (!regexMap[format].test(dateStr)) {
    return false; // format doesn't match exactly
  }

  // 2. Check if date is actually valid
  const date = dayjs(dateStr, format, true); // strict parsing
  return date.isValid();
}


