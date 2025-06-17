const express = require('express');
const router = express.Router();
const Preferences = require('../models/preferences');

router.get('/', async (req, res) => {
  const prefs = await Preferences.findOne() || new Preferences({ blockList: [] });
  res.json(prefs);
});

router.post('/block', async (req, res) => {
  const prefs = await Preferences.findOne() || new Preferences({ blockList: [] });
  if (!prefs.blockList.includes(req.body.site)) prefs.blockList.push(req.body.site);
  await prefs.save();
  res.sendStatus(200);
});

module.exports = router;