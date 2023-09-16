export const formatCelNumber = (celNumber) => {

  if(typeof celNumber !== 'string'){
    return celNumber;
  }

  const numericPhoneNumber = celNumber.replace(/\D/g, "");

  if (numericPhoneNumber.length < 10) {
    return celNumber;
  }

  const formattedCelNumber = `tel:+63-${numericPhoneNumber.slice(
    1,
    4
  )}-${numericPhoneNumber.slice(4, 7)}-${numericPhoneNumber.slice(7)}`;

  return formattedCelNumber;
};
