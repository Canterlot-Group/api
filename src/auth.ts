import { Router, Request, Response, NextFunction } from 'express';
import { Token } from './models/Token';
import { User } from './models/User';

const auth: Router = Router();
auth.use((req: Request, res: Response, next: NextFunction) => {

  if ( [null, undefined].includes(req.header('X-User-Token')) ) {
    res.locals.accountType = 'anonymous';
    return next();
  }
  else if ( typeof req.header('X-User-Token') !== 'string' )
    return res.status(403).json({ status: 'error', reason: 'Unauthenticated.' });

  const userToken: string = req.header('X-User-Token');
  Token.findByPk(userToken, {include: [User]}).then(token => {
    if (token === null)
      return res.status(403).json({ status: 'error', reason: 'Invalid token.' });
    res.locals.accountType = token.owner.accountType;
    res.locals.accountName = token.owner.name;
    res.locals.accountId   = token.owner.id;
    return next();
  });

});

export default auth;
