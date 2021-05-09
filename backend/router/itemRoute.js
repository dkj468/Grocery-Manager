const express = require('express');
const Item = require('../models/item');
const catchAsync = require('../utils/catchAsyncError');

const router = express.Router();


router.post('/', catchAsync (async (req, res, next) => {
  const newItem = await Item.create(req.body);
  res.status(201).json({
    status:'success',
    data: newItem
  });
}));

router.get('/', catchAsync (async (req, res, next) => {
  const items = await Item.find({isActive: true});
  res.status(201).json({
    status:'success',
    data: items
  });
}));

router.delete('/:id', catchAsync (async(req, res, next) => {
  const id = req.params.id;
  await Item.findByIdAndDelete(id);
  res.status(200).json({
    status:'success',
    data: null
  });
}));

module.exports = router;
