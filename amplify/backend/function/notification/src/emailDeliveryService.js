const { SES } = require("aws-sdk");
const ses = new SES({ region: process.env.REGION });

exports.handler = async (event) => {
  try {
    const message = event.Records[0].body;

    // Generate an email template
    const emailTemplate = generateEmailTemplate(message);

    // Send email using SES
    await sendEmail(emailTemplate);

    return { statusCode: 200, body: "Email sent successfully" };
  } catch (error) {
    console.error("Error:", error.message || error);
    return { statusCode: 500, body: "Error sending email" };
  }
};

function generateEmailTemplate(message) {
  const emailBody = `Hello,

  This is your email message: ${message}`;

  return {
    Subject: "Your Email Subject",
    Body: {
      Text: {
        Data: emailBody,
      },
    },
  };
}

async function sendEmail(emailTemplate) {
  const params = {
    Destination: {
      ToAddresses: [process.env.RECIPIENT_ADDRESS], 
    },
    Message: {
      Body: emailTemplate.Body,
      Subject: {
        Data: emailTemplate.Subject,
      },
    },
    Source: process.env.SENDER_ADDRESS, 
  };

  await ses.sendEmail(params).promise();
}

module.exports = {generateEmailTemplate};
