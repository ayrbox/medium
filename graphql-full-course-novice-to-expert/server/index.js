const express = require('express');
const graphHttp = require('express-graphql');

const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/graphql_books';

mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

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

