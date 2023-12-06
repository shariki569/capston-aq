
export const generateAccommodation = async (accommDetails) => {
  let intentsAndResponses = [
    {
      intent: 'accommodation.inquiry',
      utterances: [
        'Accommodations?',
        'Tell me about your Accommodations',
        'Tell me about Accommodation',
        'Accommodations',
      ],
      answers: [
        `What kind of accommodation are you looking for? 
        <strong>${accommDetails.map(accomm => accomm.Accommodation_Title).join(', ')} </strong> ?`
      ],
    },
  ];

  accommDetails.forEach((accomm) => {
    intentsAndResponses.push(
      {
        intent: `accommodation.inquiry.${accomm.Accommodation_Id}`,
        utterances: [`Tell me about ${accomm.Accommodation_Title}`],
        answers: [
          `
          Here is our  ${accomm.Accommodation_Title}
          <br/><br/>
            <strong>Title:</strong>
             ${accomm.Accommodation_Title}
             <br/>
            <strong>Type:</strong> 
            ${accomm.Accommodation_Type}
            <br/>
            <strong>Description:</strong> 
            ${accomm.Accommodation_Desc}
            <br/>
            <strong>Capacity:</strong> 
            ${accomm.Accommodation_Cap}
            <br/>
            <strong>Price:</strong> 
            ${accomm.Accommodation_Price} per 
            ${accomm.Accommodation_Unit}
            <br/>
            What would you like to know more about?
            `,
        ],
      },
      {
        intent: `accommodation.inquiryprice.${accomm.Accommodation_Id}`,
        utterances: [`What is the rate of ${accomm.Accommodation_Title}?`],
        answers: [
          `The <strong>${accomm.Accommodation_Title}</strong>  costs  <strong>₱${accomm.Accommodation_Price}</strong> 
          and can accommodate up to ${accomm.Accommodation_Cap} persons
          <br/>
          <br/>
          *note we have a corkage fee of ₱500`,
        ],
      },
      {
        intent: `accommodation.inquirycapacity.${accomm.Accommodation_Id}`,
        utterances: [`What is the capacity of ${accomm.Accommodation_Title}?`],
        answers: [
          `
            The <strong>${accomm.Accommodation_Title}</strong>  can accommodate up to ${accomm.Accommodation_Cap} persons
          `,
        ]
      },
      {
        intent: `accommodation.inquirycapacity.whatabout${accomm.Accommodation_Id}`,
        utterances: [
          `What about the capacity of ${accomm.Accommodation_Title}?`,
          `Tell me about the capacity of ${accomm.Accommodation_Title}`,
        ],
        answers: [
          `
              The <strong>${accomm.Accommodation_Title}</strong>  can also accommodate up to ${accomm.Accommodation_Cap} persons
            `,

        ]
      }
    );
  });

  return intentsAndResponses;
};
