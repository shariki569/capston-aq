import dotenv from 'dotenv';
dotenv.config();


export const generateFacilityInquiry = (facilityDetails) => {
    return [
        {
            intent: 'facility.inquiry',
            utterances: [
                'What are your facilities?',
                'Tell me about your facilities',
            ],
            answers: [
                `We have the following facilities: <strong>${facilityDetails.map(facility => facility.Fac_Title).join(', ')}</strong>
                <br/>
                You can check out more about our facilities <strong><a href="${process.env.WEBSITE_URL}/facilities" target="_blank" style="color:blue; text-decoration:underline">click here</a><strong>
                `,
                `Our facilities include: <strong>${facilityDetails.map(facility => facility.Fac_Title).join(', ')}</strong>
                <br/>
                If you would like to check out more aboutour facilities <strong><a href="${process.env.WEBSITE_URL}/facilities" target="_blank" style="color:blue; text-decoration:underline">click here</a><strong>
                `,
                `Our resort has the following facilities: <strong>${facilityDetails.map(facility => facility.Fac_Title).join(', ')}</strong>`,
            ]
        },
        {
            intent: 'facility.inquiry.' + facilityDetails[0].Fac_Id,
            utterances: [
                'Tell me about ' + facilityDetails[0].Fac_Title
            ],
            answers: [
                `Here is our ${facilityDetails[0].Fac_Title}:
                <br/><br/>
                <strong>${facilityDetails[0].Fac_Title}</strong> 
                <br/>
                 
            `],
        }
    ]
}