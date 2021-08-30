import express from 'express';
import path from 'path';
const router = express.Router();

const __dirname = path.resolve();

router.get('/', (req, res) => {
    res.send('Troll Bot');
});

export default router;
export const routeName = '/';
