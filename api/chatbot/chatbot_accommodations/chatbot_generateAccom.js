
export const generateAccommodation = async (accommDetails) => {
  let intentsAndResponses = [
    {
      intent: 'accommodation.inquiry',
      utterances: [
        'Accommodations?',
        'Tell me about your Accommodations',
        'Tell me about Accommodation',
        'Accommodations',
        'what are your accommodations?',
        'what are your accommodatiosn?',
        'what is your accommodation?'
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
        utterances: [
          `Tell me about ${accomm.Accommodation_Title}`,
          `Tell me more about ${accomm.Accommodation_Title}`,
          `${accomm.Accommodation_Title}`,
          `I want to know about ${accomm.Accommodation_Title}`,
          `Can you elaborate me about that ${accomm.Accommodation_Title}?`,
          `I want to know more about ${accomm.Accommodation_Title}`
        ],
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
            ${accomm.Accommodation_Price} per units and we have
            ${accomm.Accommodation_Unit} units in the resort 
            <br/>
            What would you like to know more about?
            <strong>${accommDetails.map(accomm => accomm.Accommodation_Title).join(', ')} </strong> ?`,
        ],
      },
      {
        intent: `accommodation.inquiryprice.${accomm.Accommodation_Id}.${accomm.Accommodation_Title}`,
        utterances: [
          `What is the rate of ${accomm.Accommodation_Title}?`,
          `Rate of ${accomm.Accommodation_Title}`,
          `What is the price of ${accomm.Accommodation_Title}?`,
          `How much is the ${accomm.Accommodation_Title}`,
          `What is the cost of the ${accomm.Accommodation_Title}`,
          `Tell me about the cost of ${accomm.Accommodation_Title}`
          
        ],
        answers: [
          `The <strong>${accomm.Accommodation_Title}</strong>  costs  <strong>₱${accomm.Accommodation_Price}</strong> 
          and it also has a night price which costs <strong>₱${accomm.Accommodation_NightPrice}</strong>
          and can accommodate up to ${accomm.Accommodation_Cap} persons
          <br/>
          <br/>
          *note we have a corkage fee of ₱500 and that appplies to all accommodations`,
          `The price of ${accomm.Accommodation_Title} costs ${accomm.Accommodation_Price} for day and ${accomm.Accommodation_NightPrice} for night`
        ],
      },
      {
        intent: `accommodation.inquirycapacity.${accomm.Accommodation_Id}`,
        utterances: [
          `What is the capacity of ${accomm.Accommodation_Title}?`,
          `Can you tell me the capacity of ${accomm.Accommodation_Title}?`,
          `capacity of ${accomm.Accommodation_Title}`,
          `${accomm.Accommodation_Title} capacity?`,
          `What is the capacity of most of the ${accomm.Accommodation_Title}?`,
        ],
        answers: [
          `The <strong>${accomm.Accommodation_Title}</strong>  can accommodate up to ${accomm.Accommodation_Cap} persons`,
        ]
      },
      {
        intent: `accommodation.inquirycapacity.whatabout${accomm.Accommodation_Id} ${accomm.Accommodation_Title}`,
        utterances: [
          `What about the capacity of ${accomm.Accommodation_Title}?`,
          `Tell me about the capacity of ${accomm.Accommodation_Title}`,
        ],
        answers: [
          `The <strong>${accomm.Accommodation_Title}</strong>  can also accommodate up to ${accomm.Accommodation_Cap} persons`,
          `It has a capacity that can accommodate up to ${accomm.Accommodation_Cap}`

        ]
      },
      {
        intent: `accommodation.inquirycapacity_vague`,
        utterances: [
          `What is the capacity of that?`,
          `Tell me how many people allowed on that?`,
          `What is the capacity?`
        ],
        answers:[
          `Can you elaborate? like <strong>${accommDetails.map(accomm => accomm.Accommodation_Title).join(', ')}?</strong>`,
          `Are you referring to <strong>${accommDetails.map(accomm => accomm.Accommodation_Title).join(', ')}?</strong>`,
          `Can you specify one of these accommodations? <strong>${accommDetails.map(accomm => accomm.Accommodation_Title).join(', ')}</strong>`
        ]
      },
      {
        intent: `accommodation.inquirycapacity_vage.${accomm.Accommodation_Id}`,
        utterances: [
          `Yes Im referring to that`,
          `I did refer to ${accomm.Accommodation_Title}`
        ],
        answers: [
          `Yes the capacity of ${accomm.Accommodation_Title} can accommodate up to ${accomm.Accommodation_Cap}`
        ]
      },
      {
        intent: `accommodation.inquiryprice_vage`,
        utterances: [
          `What is the price?`,
          `How much is the price?`,
          `What is the price?`
        ],
        answers: [
          `What is the price that you are refering to? <strong>${accommDetails.map(accomm => accomm.Accommodation_Title).join(', ')}</strong>`,
          
        ]
      }
    );
  });

  return intentsAndResponses;
};


