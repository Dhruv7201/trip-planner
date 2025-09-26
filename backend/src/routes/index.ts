import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You have access', user: (req as any).user });
});


router.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint' });
});

export default router;
