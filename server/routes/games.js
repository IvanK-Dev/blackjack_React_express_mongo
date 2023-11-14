const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid');
const ObjectModel = require('../models/ObjectModel');

router.post('/create_game', async (req, res) => {
  try {
    const objectId = nanoid();
    const object = new ObjectModel({ _id: objectId });
    await object.save();

    const token = jwt.sign({ objectId }, process.env.JWT_SECRET);
    res.json({ objectId, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
