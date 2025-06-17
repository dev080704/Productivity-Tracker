const express = require('express');
const router = express.Router();
const Log = require('../models/log');

router.get('/', async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const logs = await Log.find({ date: { $gte: today } });
  const report = logs.reduce((acc, log) => {
    acc[log.hostname] = (acc[log.hostname] || 0) + log.duration;
    return acc;
  }, {});
  res.json(report);
});

module.exports = router;