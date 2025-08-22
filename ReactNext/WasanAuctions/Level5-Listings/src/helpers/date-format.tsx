import dayjs from "dayjs";

export const getDateTimeFormat = (date: string | Date) => {
  return dayjs(date).format("MMM DD, YYYY h:mm A");
}