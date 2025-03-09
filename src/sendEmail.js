import sgMail from '@sendgrid/mail';
// import dotenv from 'dotenv';

// Load environment variables
// dotenv.config();

// Set API Key securely
sgMail.setApiKey('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');

export const sendEmail = (firstName, lastName, mobileNo, email, message) => {
    console.log("Sending email to:", email);

    const msg = {
        to: email, // Change to recipient
        from: 'rahilp704@gmail.com', // Change to a verified sender
        subject: 'Interested In Your PortFolio',
        text: `${firstName} ${lastName} is Interested in your portfolio he/she want to reach out you his/her number is ${mobileNo} he drop message ${message}`,
        html: `<strong>${firstName} ${lastName} is Interested in your portfolio he/she want to reach out you his/her number is ${mobileNo} he drop message ${message}</strong>`,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('✅ Email sent successfully');
        })
        .catch((error) => {
            console.error('❌ Error sending email:', error.message);
            if (error.response) {
                console.error('Error details:', error.response.body);
            }
        });
};

// Call function with test values
// sendEmail('rahilp002@gmail.com', '1234567');
