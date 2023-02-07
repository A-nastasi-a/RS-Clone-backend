const express = require('express');
const router = new express.Router();
const controller = require('../controllers/tablesController');


router.post('/', controller.createTable);
router.delete('/:id', controller.deleteTable);
router.put('/:id', controller.changeTable);
router.get('/:id', controller.getTable);
router.get('/', controller.getTables);

module.exports = router;
