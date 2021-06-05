const Item = require('../models/item');
const PreviousItem = require('../models/previousItem');
const catchAsync = require('../utils/catchAsyncError');

exports.addPreviousItem = catchAsync(async (req, res, next) => {
  // create entry for previous list
  req.body.user = req.user;
  const newList = await PreviousItem.create(req.body);
  const populatedList = await PreviousItem.findById(newList._id).populate(
    'Items'
  );

  // set items as InActive
  const items = req.body.items;
  items.forEach(async (item) => {
    await Item.findByIdAndUpdate(item._id, { isActive: false });
  });

  // send the response
  res.status(201).json({
    status: 'success',
    data: populatedList,
  });
});

exports.getAllPreviousItems = catchAsync(async (req, res, next) => {
  const previousItems = await PreviousItem.find({user: req.user._id}).populate({
    path: 'items',
    model: 'Item',
  });
  res.status(200).json({
    status: 'success',
    data: previousItems,
  });
});
