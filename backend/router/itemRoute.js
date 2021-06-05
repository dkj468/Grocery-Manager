const express = require('express');
const itemController = require('../controller/itemController');
const authController =  require('../controller/authController');

const router = express.Router();

router.post('/', authController.protect, itemController.addItem);
router.get('/', authController.protect, itemController.getAllItems);
router.delete('/:id', authController.protect, itemController.deleteItemById);

module.exports = router;
