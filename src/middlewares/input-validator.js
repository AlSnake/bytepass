/*eslint indent: [2, "tab", {"SwitchCase": 1}]*/

const { validator, body, validationResult } = require('express-validator');

exports.validate = (method) => {
	switch (method) {
		case 'register': {
			return [
				body('email', 'Bad Email Address')
					.exists()
					.trim()
					.isLength({ max: 64 })
					.isEmail()
					.normalizeEmail(),
				body(
					'username',
					'Username must be between 2-32 Characters, and can only contain Letters, and Numbers'
				)
					.exists()
					.trim()
					.isAlphanumeric()
					.isLength({ min: 2, max: 32 }),
				body(
					'password',
					'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number'
				)
					.exists()
					.trim()
					.isStrongPassword({
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 1,
					}),
			];
		}
		case 'account': {
			return [
				body('title', 'title must be between 1-32 Characters')
					.exists()
					.trim()
					.isLength({ min: 1, max: 32 }),
				body('url', 'Bad URL').exists().isURL().trim(),
				body(
					'user',
					'username or email must be between 1-256 Characters'
				)
					.exists()
					.trim()
					.isLength({ min: 1, max: 256 }),
				body('password', 'password must be between 1-256 Characters')
					.exists()
					.trim()
					.isLength({ min: 1, max: 256 }),
			];
		}
		case 'email': {
			return body('email', 'Bad Email Address')
				.exists()
				.trim()
				.isLength({ max: 64 })
				.isEmail()
				.normalizeEmail();
		}
		case 'phoneNumber': {
			return body(
				'phoneNumber',
				'Phone Number must be valid, and between 0-15 Characters & Must start with Country code. Example: +12023311285'
			)
				.exists()
				.trim()
				.isLength({ max: 15 })
				.isMobilePhone(validator.isMobilePhoneLocales, {
					strictMode: true,
				});
		}
		case 'username': {
			return body(
				'username',
				'Username must be between 2-32 Characters, and can only contain Letters, and Numbers'
			)
				.exists()
				.trim()
				.isAlphanumeric()
				.isLength({ min: 2, max: 32 });
		}
		case 'password': {
			return body(
				'password',
				'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number'
			)
				.exists()
				.trim()
				.isStrongPassword({
					minLength: 8,
					minLowercase: 1,
					minUppercase: 1,
					minNumbers: 1,
					minSymbols: 1,
				});
		}
	}
};

exports.errorHandler = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Input Validation Failed');
		error.statusCode = 422;
		error.errors = errors.array();
		return next(error);
	}
	next();
};
