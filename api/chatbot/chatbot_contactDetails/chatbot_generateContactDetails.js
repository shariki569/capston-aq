import dotenv from 'dotenv';
dotenv.config();



export const generateLocationEntry = (contactDetails) => {
  return [
    {
      intent: "contact.resortlocation",
      utterances: ["Where are you located?", "Where is the location?"],
      answers: [`We are located in <strong>${contactDetails.con_address}</strong>`],
    },
    {
      intent: "contact.resortemailrequest",
      utterances: [
        "Do you have any email address?",
        "What is your email address?",
      ],
      answers: [
        `Our email address is ${contactDetails.con_email}`,
        `Yes you can email us at ${contactDetails.con_email}`,
      ],
    },
    {
      intent: "contact.resortrequestdetails",
      utterances: [
        "Please provide me your contact details",
        "How may I contact you?",
        "May I know your contact details?",
      ],
      answers: [
        `You can contact us through:
          <ul>
            <li>Contact No:<strong>${contactDetails.con_cellphone}</strong></li>
            <li>Email:<strong>${contactDetails.con_email}</strong></li>
          </ul>`,
      ],
    },
    {
      intent: "contact.resortrequestnumber",
      utterances: [
        "May I know your contact number?",
        "May I know your contact no?",
        "Contact no?",
        "What Is your contact number?"
      ],
      answers: [
        `Sure! Heres our Contact Number:<strong>${contactDetails.con_cellphone}</strong>
          <br/> 
          Or you can call us through our Telephone number:<strong>${contactDetails.con_telphone}</strong>`,
      ],
    },
    {
      intent: "user.inquirybooking",
      utterances: ["Can I book for a room?"],
      answers: [
        `Unfortunately, we dont have any online booking available for now. However you can book for an accommodation by contacting us through
          <br/>
          <li>Cellphone number: ${contactDetails.con_cellphone}</li>
          Email: ${contactDetails.con_email}`

      ]
    },
    {
      intent: "contact.requestbooking",
      utterances: [
        "Can I book for a cottage online?"
      ],
      answers: [
        `Sure! Heres our Contact Number:<strong>${contactDetails.con_cellphone}</strong>
          <br/> 
          Or you can call us through our Telephone number:<strong>${contactDetails.con_telphone}</strong>`,
      ],
    },
    {
      intent: "contact.chatwithrealpeople",
      utterances: [
        "Can I chat with the real people?",
        'Can I chat with real people?',
        'Can I chat with real persons?',
        'Can I chat with real people?',
        'Is it possible to chat with real people?',
      ],
      answers: [
        `Unfortunately, we can't chat with the real people. However you can send us an email for an accommodation by emailing us through <strong>${contactDetails.con_email}</strong> or call us through <strong>${contactDetails.con_cellphone}</strong> or <strong>${contactDetails.con_telphone}</strong> for telephone.`,
        `We don't yet have an online chat. However you can send us an email for an accommodation by emailing us through <strong>${contactDetails.con_email}</strong> or call us through <strong>${contactDetails.con_cellphone}</strong> or <strong>${contactDetails.con_telphone}</strong> for telephone.
          <br/>
          or head to our <a href="https://www.google.com/maps/dir//${contactDetails.con_address}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">${contactDetails.con_address}</a> for directions.`,
        `You can head to our <a href="${process.env.WEBSITE_URL}/contact-us" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">Contact Us page</a> for Email inquiries.`,
      ],
    }
  ];
}