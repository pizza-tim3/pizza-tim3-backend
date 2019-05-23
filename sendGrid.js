// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

function sendEmail(toEmail, fromEmail, subjectEmail, textEmail) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    //"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"
    process.env.sendgrid

  );
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

