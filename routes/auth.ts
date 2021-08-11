import { Router } from 'express';

import { login, logout, register, getCurrentUser } from '../controllers/auth';

const router = Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/register', register);

router.get('/current-user', getCurrentUser);

export default router;
