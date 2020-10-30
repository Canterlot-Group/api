import express from 'express';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'fail', humanReadable: 'No route given.' });
});

export default router;
