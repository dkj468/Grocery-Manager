const Item = require('../models/item');
const catchAsync = require('../utils/catchAsyncError');

exports.addItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newItem,
  });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find({ isActive: true });
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
