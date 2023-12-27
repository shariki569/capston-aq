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
        "What Is your contact number?",
        'contact number?',
        'What is your number?',
        'Okay I want to know your contact no?',
        'Okay I want to know your contact number?'
      ],
      answers: [
        `Sure! Heres our Contact Number:<strong>${contactDetails.con_cellphone}</strong>
          <br/> 
          Or you can call us through our Telephone number:<strong>${contactDetails.con_telphone}</strong>`,
        `We have the following contact numbers which are <strong>${contactDetails.con_cellphone}</strong> for cellphone number and <strong>${contactDetails.con_telphone}</strong> for telephone number`
      ],
    },
    {
      intent: "user.inquirybooking",
      utterances: [
        "Can I book for a room?",
        "I wanna book a room",
        'Let me book a room',
        'Can I book a room?',
        'I want to book a room',
        'I want to book room',
        'book an accommodation',
        'book me an accommodation',
        'book a cottage',
        'book an event hall',
        'book a rooms',
        'book rooms',
        'book me',
        'I want to book an accommodation',
        'let me book an accommodation'
      ],
      answers: [
        `Unfortunately, we dont have any online booking available for now. However you can book for an accommodation by contacting us through
          <br/>
          <li>Cellphone number: <strong>${contactDetails.con_cellphone}</strong></li> or email us through
          Email: <strong>${contactDetails.con_email}</strong>`,
          `Im sorry for we dont have any online booking available but you can contact us through 
          <br/>
          <li>Cellphone number: <strong>${contactDetails.con_cellphone}</strong></li>
          or email us through <strong>${contactDetails.con_email}</strong>
          for booking inquiries or you can head on our <a href="${process.env.WEBSITE_URL}/contact-us" target="_blank" style="color:blue; text-decoration:underline">Contact Us page</a>`
        

      ]
    },
    {
      intent: "contact.requestbooking",
      utterances: [
        "Can I book for a cottage online?",
        "Book online?",
        "online book room?"
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
          or head to our <a href="https://www.google.com/maps/dir/${contactDetails.con_address}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">${contactDetails.con_address}</a> for directions.`,
        `You can head to our <a href="${process.env.WEBSITE_URL}/contact-us" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">Contact Us page</a> for Email inquiries.`,
      ],
    },
    {
      intent: "contact.manager",
      utterances: [
        "May I contact your manager",
        'can i contact manager',
        'manager contact',
        'let me contact manager',
        'Can i contact your manager',
        
      ],
      answers: [
        `Sure! Heres our Contact Number:<strong>${contactDetails.con_cellphone}</strong>
          <br/> 
          Or you can call us through our Telephone number:<strong>${contactDetails.con_telphone}</strong>`,
        `We have the following contact numbers which are <strong>${contactDetails.con_cellphone}</strong> for cellphone number and <strong>${contactDetails.con_telphone}</strong> for telephone number`
      ],
    },
  ];
}