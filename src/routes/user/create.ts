import { Request, Response } from 'express';
import { User } from './../../models/User';
import { ValidationErrorItem } from 'sequelize';

export default function (req: Request, res: Response) {

  if (res.locals.accountType !== 'administrator')
    return res.status(403).json({ status: 'error', reason: 'Ensure you\'re using an administrator token to create an account.' });

  User.findOrCreate({where: req.body}).then(([user, created]: [any, boolean]) => {
    if (!created)
      return res.status(400).json({ status: 'error', reason: 'User already exist.' });
    else
      return res.status(200).json({ status: 'ok', message: 'Created', user });
  }).catch((error: ValidationErrorItem) =>
    res.status(400).json({ status: 'error', reason: error.message })
  );

};
