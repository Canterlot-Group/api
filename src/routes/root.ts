import { Request, Response } from 'express';

export default function (req: Request, res: Response) {
  res.status(200).json({ status: 'error', reason: 'Route not provided.' });
}
