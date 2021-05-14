const express = require('express');
const previousItemController = require('../controller/previousItemController');

const router = express.Router();

// tslint:disable-next-line: quotemark
router.post('/', previousItemController.addPreviousItem);
router.get('/', previousItemController.getAllPreviousItems);

module.exports = router;
