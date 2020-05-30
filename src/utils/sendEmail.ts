import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const SendEmail= async (email:string,link:string)=> {

  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: process.env.SENDGRID_API_KEY, // generated ethereal password
    },
    debug: true, // show debug output
    logger: true // log information in console
  });


  var mailOptions = {
    from: 'amersaif29@gmail.com',
    to: email,
    subject: 'Nice Nodemailer test',
    html: `<a href="${link}">Confirm Email</a>`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error',error);
    }
    console.log('Message sent: %s', info.messageId);
  });

}
