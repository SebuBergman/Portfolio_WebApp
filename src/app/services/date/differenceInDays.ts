import dayjs from "dayjs";

export function differenceInDays(
  date1: string | Date,
  date2: string | Date
): number {
  return dayjs(date1).diff(dayjs(date2), "day");
}
