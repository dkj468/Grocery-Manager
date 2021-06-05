const Item = require('../models/item');
const catchAsync = require('../utils/catchAsyncError');

exports.addItem = catchAsync(async (req, res, next) => {
  console.log(req.user);
  req.body.user = req.user;
  const newItem = await Item.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newItem,
  });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const items = await Item.find({ isActive: true, user: req.user._id });
  res.status(200).json({
    status: 'success',
    data: items,
  });
});

exports.deleteItemById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Item.findByIdAndDelete(id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
