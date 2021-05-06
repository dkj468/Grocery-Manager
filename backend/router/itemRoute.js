const express = require('express');
const Item = require('../models/item');

const router = express.Router();


router.post('/', async (req, res) => {
  const newItem = await Item.create(req.body);
  console.log(newItem);
  res.status(201).json({
    status:'success',
    data: newItem
  });
});

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.status(201).json({
    status:'success',
    data: items
  });
});

router.delete('/:id', async(req, res) => {
  const id = req.params.id;
  await Item.findByIdAndDelete(id);
  res.status(200).json({
    status:'success',
    data: null
  });
});

module.exports = router;
