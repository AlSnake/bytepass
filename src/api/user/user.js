const router = require('express').Router();

const UserController = require('../../controllers/user/user');
const isAuth = require('../../middlewares/is-authenticated');
const inputValidator = require('../../middlewares/input-validator');

router.get('/accounts', isAuth, UserController.getAccounts);
router.post(
	'/accounts',
	isAuth,
	inputValidator.validate('account'),
	inputValidator.errorHandler,
	UserController.postAccounts
);

module.exports = router;
