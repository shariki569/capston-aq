let lastDigitId = 0;

export const idGenerator = () => {
  const currYear = new Date().getFullYear();
  const lastTwoDigitofTheYear = currYear % 100;
  const randomTwoDigits = Math.floor(Math.random() * 90) + 10;
  lastDigitId++;
  const uniqueId = `${lastTwoDigitofTheYear}${randomTwoDigits}${lastDigitId}`;
  return uniqueId;
};
