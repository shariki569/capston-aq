import { getRatings } from "../chatbot_getRatings/chatbot_getData.js";
import { getAccommodation} from "../chatbot_accommodations/chatbot_accommInquiry.js";
import { generateAccommodation } from "../chatbot_accommodations/chatbot_generateAccom.js";
import { getContactDetails } from "../chatbot_contactDetails/chatbot_contactDetails.js";
import { generateLocationEntry } from "../chatbot_contactDetails/chatbot_generateContactDetails.js";
import { generateRatingEntry } from "../chatbot_getRatings/chatbot_generateRatings.js";
import { getFacilities } from "../chatbot_facilities/chatbot_facilityInquiry.js";
import { generateFacilityInquiry } from "../chatbot_facilities/chatbot_generateFacilityInquiry.js";

export const generateCorpusEntries = async () => {
  //Getting the data
  const contactDetails = await getContactDetails();
  const accommDetails = await getAccommodation();
  // const roomDetails = await getRooms();
  const ratingDetails = await getRatings();
 const facilityDetails = await getFacilities();
  //Generating the data

  const locationEntry = generateLocationEntry(contactDetails);
  const acommEntry = await generateAccommodation(accommDetails);
  const ratingEntry = await generateRatingEntry(ratingDetails);
  const facilityEntry = await generateFacilityInquiry(facilityDetails);
  // Create more entries as needed
  return [].concat(
    ...locationEntry,
    ...acommEntry,
    ...ratingEntry,
    ...facilityEntry
  );
};
