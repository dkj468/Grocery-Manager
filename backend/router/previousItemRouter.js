const express = require('express');
const previousItemController = require('../controller/previousItemController');
const authController = require('../controller/authController');

const router = express.Router();

// tslint:disable-next-line: quotemark
router.post('/', authController.protect, previousItemController.addPreviousItem);
router.get('/', authController.protect, previousItemController.getAllPreviousItems);

module.exports = router;
