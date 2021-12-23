const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
	const authCookie = req.cookies.Authorization;
	if (!authCookie) {
		const error = new Error('Not Authenticated');
		error.statusCode = 401;
		throw error;
	}

	try {
		const token = authCookie.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decodedToken.userId;
		next();
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
};
