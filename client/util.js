export const timeUntilDate = (date) => {
  const now = new Date();
  const days = Math.ceil(
    Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );
  return days === 1
    ? "1 day"
    : days > 7
    ? `${Math.ceil(days / 7)} weeks`
    : `${days} days`;
};

export const getDayFromIndex = (index) =>
  ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"][
    index
  ];

export const heatMapColorforValue = (value) => {
  var h = (1.0 - value) * 240;
  return "hsl(" + h + ", 80%, 70%)";
};

export const stroke = "#32308e";
export const border = `2px solid ${stroke}`;
