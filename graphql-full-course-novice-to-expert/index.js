const express = require('express');
const graphHttp = require('express-graphql');

const schema = require('./schema/schema.js');

const port = 4000;
const app = express();

app.use(graphHttp({
  schema, 
  graphiql: true,
}));


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

