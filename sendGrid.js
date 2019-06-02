// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

function sendEmail(toEmail, fromEmail, subjectEmail, textEmail) {
  const sgMail = require("@sendgrid/mail");
<<<<<<< HEAD
  sgMail.setApiKey(
    (process.env.sendgrid)
  );
=======
  sgMail.setApiKey(process.env.sendgrid);
>>>>>>> origin/development
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
