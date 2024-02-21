export const useTimeDifference = (time) => {
  let differenceFromNow = Date.now() - parseInt(time);
  let checkFor12Hour = 720 - differenceFromNow / 60000;
  if (checkFor12Hour > 0) {
    let remainingTimeInHrs = ((checkFor12Hour - 0) / 720) * 100;
    return remainingTimeInHrs;
  }
  return 0;
};
