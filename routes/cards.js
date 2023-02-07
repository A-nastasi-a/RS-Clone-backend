const express = require('express');
const router = new express.Router();
const controller = require('../controllers/cardsController');

router.get('/',  controller.getCards);
router.get('/:id', controller.getCard);
router.post('/', controller.addCard);
router.delete('/:id', controller.deleteCard);
router.put('/:id', controller.updateCard);

module.exports = router;
