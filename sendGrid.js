// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

function sendEmail(toEmail, fromEmail, subjectEmail, textEmail) {
  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: subjectEmail,
    text: textEmail,
    html: "<strong>please attend this party</strong>"
  };
  sgMail.send(msg);
}
sendEmail(
  "Belktaylor12@gmail.com",
  "sinha.arpita@gmail.com",
  " Party Invitation",
  "You are invited"
);
