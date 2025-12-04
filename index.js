import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport                                                            const transporter = nodemailer.createTransport({
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth:{
        user:  "iancovixakala2023@gmail.com",
        pass: "iancovix2008",
  },
});
transporter.sendMail({
  from: 'iancovixakala2023@gmail.com',
  to: 'covixstores256@gmail.com',
        subject: 'Test Email',
        html: '<h1>Hello from Node.js</h1>'
});

// Renplace with your SMTP server            