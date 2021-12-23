const router = require('express').Router();

const AuthController = require('../../controllers/auth/auth');
const inputValidator = require('../../middlewares/input-validator');
const isAuth = require('../../middlewares/is-authenticated');

router.post(
	'/register',
	inputValidator.validate('register'),
	inputValidator.errorHandler,
	AuthController.postRegister
);

router.post(
	'/login',
	inputValidator.validate('email'),
	inputValidator.errorHandler,
	AuthController.postLogin
);

router.post('/logout', isAuth, AuthController.postLogout);

router.post(
	'/verify/email',
	inputValidator.validate('email'),
	inputValidator.errorHandler,
	AuthController.postVerifyEmail
);

module.exports = router;
