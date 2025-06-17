const express = require('express');
const router = express.Router();
const Log = require('../models/log');

router.post('/', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('POST /api/log error:', error);
    res.status(500).json({ error: 'Failed to save log' });
  }
});

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    console.error('GET /api/log error:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});


module.exports = router;