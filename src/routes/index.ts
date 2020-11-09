import { Router } from 'express';

import rootRoute from './root';
import userRouteGetOne from './user/getOneById';

const router = Router();
router.get('/', rootRoute);

router.get('/user/:id', userRouteGetOne);

export default router;
