//ndxg zryj bfsz bfyq

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: 'kioosk.app@gmail.com', 
        pass: 'ndxg zryj bfsz bfyq'
    }
});

export const sendEmailMsg = async (req, res) => {
    const {subject, message, email} = req.body;
    const user = `you have an email with subject ${subject} from ${email}`;
    try {
        let details = {  //according to nodeMailer
            from: email,
            to: 'kioosk.app@gmail.com',
            subject: user,
            text: message
        }

        await transporter.sendMail(details);
        res.json('your email was sent successfully.');
        
    } catch (error) {
        res.json(error);
    }
};