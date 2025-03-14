// const SibApiV3Sdk = require('sib-api-v3-sdk');

// const sendEmailCampaign = async () => {
//     try {
//         // Instantiate the client
//         let defaultClient = SibApiV3Sdk.ApiClient.instance;
//         let apiKey = defaultClient.authentications['api-key'];
//         apiKey.apiKey = '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'; // Replace with your actual API key

//         let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
//         let emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

//         // Define the campaign settings
//         emailCampaigns.name = "Campaign sent via the API";
//         emailCampaigns.subject = "My subject";
//         emailCampaigns.sender = { name: "Rahil Patel", email: "rahilp704@gmail.com" };
//         emailCampaigns.type = "classic";

//         // Content that will be sent
//         emailCampaigns.htmlContent = "Congratulations! You successfully sent this example campaign via the Brevo API.";

//         // Select the recipients
//         emailCampaigns.recipients = { listIds: [2, 7] };

//         // Schedule the sending (optional)
//         // emailCampaigns.scheduledAt = "2025-03-15 00:00:01"; // Use a future timestamp

//         // Call API
//         const response = await apiInstance.createEmailCampaign(emailCampaigns);
//         console.log("✅ Email campaign sent successfully:", response);
//     } catch (error) {
//         console.error("❌ Error:", error.response ? error.response.body : error.message);
//     }
// };

// // Call the function
// sendEmailCampaign();



import sgMail from '@sendgrid/mail';

sgMail.setApiKey("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");

export const sendEmail = async (firstName, lastName, mobileNo, email, message) => {
    console.log("Sending email to:", email);

    const msg = {
        to: email, // Change to recipient
        from: 'rahilp704@gmail.com', // Change to a verified sender
        subject: 'Thank You for Contact Me',
        text: `Hello, ${firstName} ${lastName} Thank You for Contact Me`,
        html: `<strong>${firstName} ${lastName} Thank You for Contact Me </strong>`,
    };

    await sgMail.send(msg).then(() => {
        console.log('✅ Email sent successfully');
    }).catch((error) => {
        console.error('❌ Error sending email:', error.message);
        if (error.response) {
            console.error('Error details:', error.response.body);
        }
        return { success: false, error: error.message };
    });
};

// Call function with test values
// sendEmail('rahil','patel','9316080624','rahilp002@gmail.com', 'Test datatsj');
