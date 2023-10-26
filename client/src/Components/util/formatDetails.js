export const formatAsCellPhoneNumber = (inputValue) => {
  const cleanedInput = inputValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
  const match = cleanedInput.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/);

  if (match.length <= 11) {
    return match[1] + " " + match[2] + " " + match[3];
  } else {
    return cleanedInput.substring(0, 11);
  }
};

// Helper function to format as (XXX) XXX XXXX
export const formatAsPhoneNumber = (inputValue) => {
  const cleanedInput = inputValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
  const match = cleanedInput.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

  if (match.length <= 9) {
    return `(${match[1]}) ${match[2]} ${match[3]}`.trim();
  } else {
    return inputValue; // Return the input as is if it doesn't match the format
  }
};
