import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatDate(date: string | Date | null, format: string) {
  return dayjs(date).format(format);
}

export function timeAgo(timestamp: string): string {
  return dayjs(timestamp).fromNow();
}
