const express = require('express');
const router = new express.Router();
const controller = require('../controllers/usersController');
const {check} = require('express-validator');

router.post('/registration', [
  check('username', "Username can't be empty").notEmpty(),
  check('password', "Password should be more than 8 and less than 15 symbols").isLength({min: 8, max: 15})
], controller.registration);
router.post('/login', controller.login);
router.get('/', controller.getUsers);
router.delete('/:id', controller.deleteUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getUser);



module.exports = router;
