import express from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import Stream from './stream';
import rootRoute from './routes/root';
import sequelize from './database';

console.log(sequelize); // to make compiler think it is actually used, delete later.

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use(rootRoute);

app.use(bodyParser.json({
  limit: '600mb', verify(req: any, res: any, buf: any) {
    req.rawBody = buf;
  }
}));

export default app;
