import { Router, Request, Response, NextFunction } from 'express';
import { Token } from './models/Token';
import { User } from './models/User';
import config from 'config';

const authenticationEnabled: boolean = !(process.env.YH_DISABLE_AUTH === 'yes');
const debugTokensEnabled: boolean = (process.env.YH_DEBUG_TOKENS === 'yes');

if (!authenticationEnabled)
  console.info('Caution: Running with authentication disabled. Everyone has unlimited permissions.');
if (debugTokensEnabled)
  console.info('Caution: Debug tokens enabled, everyone with such token has administrator access.');


const auth: Router = Router();
auth.use((req: Request, res: Response, next: NextFunction) => {

  const userToken: string = req.header('X-User-Token');
  const debugTokens: string[] = config.get('debugTokens');

  if (!authenticationEnabled || (debugTokensEnabled && debugTokens.includes(userToken))) {
    res.locals.accountType = 'administrator';
    res.locals.accountName = 'Server';
    res.locals.accountId   = null;
    return next();
  }

  if ( [null, undefined].includes(req.header('X-User-Token')) ) {
    res.locals.accountType = 'anonymous';
    return next();
  }
  else if ( typeof req.header('X-User-Token') !== 'string' )
    return res.status(403).json({ status: 'error', reason: 'Unauthenticated.' });

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
