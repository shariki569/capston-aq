export const  generateLocationEntry = (contactDetails) => {
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
            <li>Contact No:<bold>${contactDetails.con_cellphone}</bold></li>
            <li>Email:<bold>${contactDetails.con_email}</bold></li>
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
    ];
  }