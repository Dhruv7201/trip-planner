import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
const router = Router();


router.get('/userinfo', (req, res) => {
    res.json({ user: (req as any).user });
});

export default router;
