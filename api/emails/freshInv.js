const express = require("express");
const router = express.Router();

// requires a toEmail and name of user
router.post("/", (req, res) => {
    const { name } = req.body;
    const { toEmail } = req.body;
    
    try {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: toEmail,					//receiver's email
        from: 'pizzatimeapp@gmail.com',			//sender's email
        subject: 'Pending Invite!',				//Subject
        templateId: 'd-ace306042e11429e954cca9a6a82b5e7',
        dynamic_template_data: {
            name: name
        }
        };
        sgMail.send(msg)
        res.status(200).json('send successful');
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;