const mongoose = require('mongoose');
const Item = require('./item');


const previousItemSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  amount:{
    type: Number
  },
  items:[{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
});

const PreviousItem = mongoose.model('PreviousItem', previousItemSchema);

module.exports = PreviousItem;


