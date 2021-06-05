const mongoose = require('mongoose');


const previousItemSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  amount:{
    type: Number
  },
  items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}],
  user:{
    type: mongoose.Schema.Types,
    ref: 'User'
  },
});

const PreviousItem = mongoose.model('PreviousItem', previousItemSchema);

module.exports = PreviousItem;


