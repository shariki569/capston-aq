
import { getAccommodation } from "../chatbot_accommodations/chatbot_accommInquiry.js";
import { generateAccommodation } from "../chatbot_accommodations/chatbot_generateAccom.js";
import { getContactDetails } from "../chatbot_contactDetails/chatbot_contactDetails.js";
import { generateLocationEntry } from "../chatbot_contactDetails/chatbot_generateContactDetails.js";





export const generateCorpusEntries = async () => {
 
  //Getting the data
  const contactDetails = await getContactDetails();
  const accommDetails = await getAccommodation();


  //Generating the data
  const locationEntry = generateLocationEntry(contactDetails);
  const acommEntry = await generateAccommodation(accommDetails);

  // Create more entries as needed
  return [].concat(...locationEntry, ...acommEntry);
};