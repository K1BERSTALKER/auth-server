import express from 'express';
import { getProfile, login, logout, register } from "@controllers/authController";
import { protect } from 'middlewares/authMiddleware';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/get-profile', protect,getProfile);

export default router;
