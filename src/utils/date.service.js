const getMinutesFromSeconds = (date = 0) => {
  return date / 60000;
};

const getMinutesBetweenDates = (startDate, endDate) => {
  const diff = endDate.getTime() - startDate.getTime();
  return getMinutesFromSeconds(diff);
};

module.exports = {
  getMinutesBetweenDates,
  getMinutesFromSeconds,
};
