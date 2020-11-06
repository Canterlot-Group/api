import express from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import Stream from './stream';
import sequelize from './database';
import auth from './auth';

console.log(sequelize); // to make compiler think it is actually used, delete later.

import rootRoute from './routes/root';
import userRouteGetOne from './routes/user/getOneById';

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(auth);

app.use(bodyParser.json({
  limit: '600mb', verify(req: any, res: any, buf: any) {
    req.rawBody = buf;
  }
}));

app.use(rootRoute);
app.use(userRouteGetOne);

export default app;
