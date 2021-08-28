const nodemailer = require('nodemailer');
const sendInBlue = require('nodemailer-sendinblue-transport');

exports.sendPasswordResetmail = async (email, token) => {
  const transporter = nodemailer.createTransport(
    sendInBlue({
      apiKey: process.env.V2_API_KEY,
    })
  );
  const url = `${process.env.API_URL}/reset-password/${token}`;
  await transporter.sendMail({
    to: email,
    fromName: 'FloraSearch',
    from: 'noreply@florasearch.com',
    subject: 'Reset your FloraSearch account password',
    text: `Please click on this url to reset your password.\n${url}\nIf you didn't request this, then you can ignore this email.`,
  });
};
