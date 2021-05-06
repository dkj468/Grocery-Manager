const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  quantity:{
    type: Number
  },
  unit:{
    type: String
  },
  amount:{
    type: Number
  }
},{
  versionKey: false
}
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
