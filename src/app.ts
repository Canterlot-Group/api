import express from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// import Stream from './stream';
import './database';
import auth from './auth';
import routes from './routes/';

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

app.use('/', routes);
export default app;
