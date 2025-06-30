const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andregabschuh@gmail.com',
        pass: 'zkbr lgao sgds lbsz'
    }
});

module.exports = transporter;
