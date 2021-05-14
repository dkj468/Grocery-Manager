const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Deepak Jain <deepak.pce1992@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html:`<h1>${options.text}</h1>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
