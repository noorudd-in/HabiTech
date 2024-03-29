import dayjs from "dayjs";

// Helper functions
export const useTimeDifference = (time, duration) => {
  let differenceFromNow = Date.now() - parseInt(time);
  let checkHour = duration - differenceFromNow / 60000;
  if (checkHour > 0) {
    let remainingTimeInHrs = ((checkHour - 0) / duration) * 100;
    return remainingTimeInHrs;
  }
  return 0;
};

export const useDayDifference = (day, period) => {
  let dueDate = dayjs(new Date(day)).add(period, "day");
  return dueDate.isBefore(dayjs());
};
