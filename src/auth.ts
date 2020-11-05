import { Router, Request, Response, NextFunction } from 'express';
import { Token } from './models/Token';
import { User } from './models/User';

const auth: Router = Router();
auth.use((req: Request, res: Response, next: NextFunction) => {

  if ( typeof req.header('X-User-Token') !== 'string' )
    return res.status(403).json({ status: 'error', reason: 'Unauthenticated.' });

  const userToken: string = req.header('X-User-Token');
  Token.findByPk(userToken, {include: [User]}).then(token => {
    res.locals.accountType = token.owner.accountType;
    return token ? next() : res.status(403).json({ status: 'error', reason: 'Invalid token.' });
  });

});

export default auth;
