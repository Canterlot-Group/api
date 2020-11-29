import { Request, Response } from 'express';
import { User } from './../../models/User';
import { Station } from './../../models/Station';

/*
 * GET :id
 */

export default function (req: Request, res: Response) {

  if (req.params.id !== res.locals.accountId && !['member', 'administrator'].includes(res.locals.accountType))
    return res.status(403).json({ status: 'error', reason: 'Unable to view other users without member privileges or higher.' });

  User.findByPk(req.params.id, { attributes: ['id', 'name', 'email', 'loginEnabled', 'bannedUntil', 'bannedReason'], include: [Station] }).then(user => {
    if (user === null)
      return res.status(404).json({ status: 'error', reason: 'User by this ID does not exist.' });
    return res.json({ status: 'ok', user });
  });

};
