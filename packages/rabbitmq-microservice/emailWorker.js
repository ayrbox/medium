const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');


function sendEmailTo(receiverEmail) {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.etheral.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      }
    });

    const mailOptions = {
      from: 'srdx7@hotmail.com',
      to: receiverEmail,
      subject: 'Subscription',
      text: 'You are subscribed successfully',
      html: '<strong>You are subscribed successfully.</strong>',
    };


    transporter.sendMail(mailOptions, function(err, info) {
      if(err) {
        console.log(err);
        return;
      }
      console.log('Message send: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}



amqp.connect('amqp://user:bitnami@localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {

    const q = 'email';

    ch.assertQueue(q, { durable: true });
    console.log(" [*] Waiting for message in %s. To exit press CTRL + C", q);

    ch.consume(q, function(msg) {
      console.log(' [x] Received %s', msg.content.toString())
      let form = JSON.parse(msg.content.toString());
      sendEmailTo(form.email);
    }, { noAck: true });

  });
});