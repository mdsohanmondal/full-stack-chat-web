import { Router } from 'express';
import { sendMessage, getMessages, getAllMessages } from '../controllers/messageController.js';
const router = Router();
router.post('/send', sendMessage);
router.get('/message', getMessages);
router.get('/all-messages', getAllMessages);
export default router;
