const express = require('express');
const amqp = require('amqplib/callback_api');

function bail(err) {
  console.log(err);
  process.exit(1);
}

amqp.connect('amqp://user:bitnami@localhost/', function(err, conn) {
  conn.createChannel(function(err, ch) {
    if(err) {
      bail(err);
      return;
    }

    const q = 'hello';
    ch.assertQueue(q, { durable: true });

    ch.sendToQueue(q, new Buffer('Hello World'), { persistent: true });

    console.log('[x] Send Hello World to Queue');
  });
});


const DEFAULT_PORT = 3099;
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(DEFAULT_PORT, () => console.log(`App running on port ${DEFAULT_PORT}`));
