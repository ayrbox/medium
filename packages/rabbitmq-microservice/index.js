const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const amqp = require('amqplib/callback_api');

const DEFAULT_PORT = 3099;

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/subscribe', (req, res) => {
  sendToQueue(req.body);
  res.render('thankyou.html');
});


app.listen(DEFAULT_PORT, () => {
  console.log(`App running on port ${DEFAULT_PORT}`)
});


function sendToQueue(msg) {
  amqp.connect('amqp://user:bitnami@localhost/', function(err, conn) {
    conn.createChannel(function(err, ch) {
      if(err) {
        bail(err);
        return;
      }

      const q = 'email';
      ch.assertQueue(q, { durable: true });

      ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), { persistent: true });

      console.log('Message send to queue : ', msg);
    });
  });
}
