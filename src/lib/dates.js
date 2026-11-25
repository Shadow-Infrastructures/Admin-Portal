export const DATE_RANGE_FILTERS = ['Today', 'Week', 'Monthly', 'Year to date', 'Custom'];

const DAY_MS = 24 * 60 * 60 * 1000;

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDisplayDate(value) {
  return startOfDay(new Date(value));
}

export function daysBetween(from, to) {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS);
}

export function getDateRange(filter, customFrom, customTo, now = new Date()) {
  const today = startOfDay(now);
  const endOfToday = new Date(today.getTime() + DAY_MS - 1);

  switch (filter) {
    case 'Today':
      return { start: today, end: endOfToday };
    case 'Week':
      return { start: new Date(today.getTime() - 6 * DAY_MS), end: endOfToday };
    case 'Monthly':
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfToday };
    case 'Year to date':
      return { start: new Date(now.getFullYear(), 0, 1), end: endOfToday };
    case 'Custom': {
      const start = customFrom ? new Date(`${customFrom}T00:00`) : new Date(0);
      const end = customTo ? new Date(`${customTo}T23:59:59.999`) : endOfToday;
      return { start, end };
    }
    default:
      return { start: new Date(0), end: endOfToday };
  }
}

export function isWithinRange(date, range) {
  return date.getTime() >= range.start.getTime() && date.getTime() <= range.end.getTime();
}
