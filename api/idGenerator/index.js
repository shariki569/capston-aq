let lastDigitId = 0;

export const idGenerator = () => {
  const currYear = new Date().getFullYear();
  const lastTwoDigitofTheYear = currYear % 100;

  lastDigitId++;
  const uniqueId = `${lastTwoDigitofTheYear}${lastDigitId}`;
  return uniqueId;
};
