import express from 'express';
import fs from 'fs';
const router = express.Router();
const port = JSON.parse(fs.readFileSync('./props/default.json')).port;

router.get('/', (req, res) => {
    res.json({ port });
});

export default router;
