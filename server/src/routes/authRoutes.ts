
import express from 'express'
// import { register } from 'module';
import { login, logout, register, refreshAccessToken} from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logout);

export default router;