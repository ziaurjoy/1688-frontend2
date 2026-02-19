/**
 * Converts an ISO timestamp into a human-friendly format
 * @param isoString - e.g., "2026-02-18T09:10:32.056000"
 * @returns - e.g., "Feb 18, 2026, 9:10 AM"
 */
export const formatHumanReadableDate = (isoString: string): string => {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

// Example Usage:
// const displayDate = formatHumanReadableDate("2026-02-18T09:10:32.056000");
// console.log(displayDate); // "Feb 18, 2026, 9:10 AM"
