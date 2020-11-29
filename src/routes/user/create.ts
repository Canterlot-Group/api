import { Request, Response } from 'express';
import { User } from './../../models/User';
import { ValidationErrorItem, Op } from 'sequelize';

/*
 * POST - JSON
 * {
 *    "name":     string(min: 4, max: 16, alphanumeric),
 *    "email":    string(min: 6, max: 32, is email),
 *    "password": string(min: 6, max: 64),
 *
 *    "loginEnabled": boolean(optional),
 *    "accountType": string(optional, one of ["regular", "member", "administrator"])
 * }
 */

export default function (req: Request, res: Response) {

  if (res.locals.accountType !== 'administrator')
    return res.status(403).json({ status: 'error', reason: 'Ensure you\'re using an administrator token to create an account.' });

  ['id', 'bannedUntil', 'bannedReason', 'tokens', 'memberIn', 'avatar'].forEach(e => delete req.body[e]);

  User.findOrCreate({where: {[Op.or]: {name: req.body.name, email: req.body.email}}}).then(([user, created]: [any, boolean]) => {
    if (!created)
      return res.status(400).json({ status: 'error', reason: 'User already exist.' });
    else
      return res.status(200).json({ status: 'ok', message: 'Created', userID: user.id });
  }).catch((error: ValidationErrorItem) =>
    res.status(400).json({ status: 'error', reason: error.message })
  );

};
