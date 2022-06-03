import express from 'express';
import path from 'path';
const router = express.Router();

const __dirname = path.resolve();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// exporting the router
export default router;

// choosing a custom route name
export const routeName = '/';
