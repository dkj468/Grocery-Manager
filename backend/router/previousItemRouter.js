const express = require('express');
const PreviousItem = require('../models/previousItem');
const Item = require('../models/item');
const catchAsync = require('../utils/catchAsyncError');


const router = express.Router();


// tslint:disable-next-line: quotemark
router.post('/', catchAsync(async (req, res, next) => {
  // create entry for previous list

  const newList = await  PreviousItem.create(req.body);
  const populatedList = await PreviousItem.findById(newList._id).populate('Items');

  // set items as InActive
  const items = req.body.items;
  items.forEach(async item =>  {
    await Item.findByIdAndUpdate(item._id, { isActive: false});
  });

  console.log(populatedList);

  // send the response
  res.status(201).json({
    status: 'success',
    data: populatedList
  });
}));

router.get('/', catchAsync(async (req, res, next) => {
  const previousItems = await PreviousItem.find({}).populate({path:'items', model:'Item'});
  res.status(200).json({
    status:'success',
    data: previousItems
  });
}));

module.exports = router;
