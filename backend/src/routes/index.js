import { Router } from 'express';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import messageRoute from './messageRout.js';
const router = Router();
router.use('/auth', authRoute);
router.use('/', userRoute);
router.use('/message', messageRoute);
export default router;
