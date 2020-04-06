import express from 'express';
import cors from 'cors';
import expressGraphql from 'express-graphql';
import { buildSchema } from 'graphql';
import typeDefs from './schema';
import * as rootValue from './resolvers';

const env = process.env.NODE_ENV;
const port = process.env.PORT || 3030; 

const app = express();
const schema = buildSchema(typeDefs);

app.use(cors());


app.use('/api', cors(), expressGraphql({
  schema,
  rootValue,
  graphiql: env === 'development',
}));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
