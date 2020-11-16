import { Router } from 'express';

import rootRoute from './root';
import userRouteGetOne from './user/getOneById';
import userCreate from './user/create';

const router = Router();

// Root
router.get('/', rootRoute);

// Users
router.get('/user/:id', userRouteGetOne);
router.post('/user', userCreate);

export default router;
