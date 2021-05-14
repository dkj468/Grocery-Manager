const express = require('express');
const itemController = require('../controller/itemController');
const authController =  require('../controller/authController');

const router = express.Router();

router.post('/', itemController.addItem);
router.get('/', authController.protect,itemController.getAllItems);
router.delete('/:id', itemController.deleteItemById);

module.exports = router;
