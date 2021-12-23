const express = require('express');
require('dotenv').config();
const DatabaseHelper = require('./helpers/database');
const MongodbConfig = require('./config/mongodb');
const logger = require('./core/logger');
const cookieParser = require('cookie-parser');

const app = express();

// Express Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTE APIs
app.use('/', require('./api/router'));

// Internal Error Handler (Development)
if (app.get('env') == 'development') {
	app.use((err, req, res, next) => {
		const status = err.statusCode || 500;
		const message = err.message;
		const errors = err.errors;
		return res
			.status(status)
			.json({ message: message, debug: err, error: errors });
	});
}

// Production Error Handler
app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	const message = err.message;
	const errors = err.errors;
	return res.status(status).json({ message: message });
});

DatabaseHelper.connect(MongodbConfig.MONGODB_URI, (error) => {
	if (error) logger.error(error);

	app.listen(process.env.PORT || 3000, () => {
		logger.info('Running on Port: %d', process.env.PORT || 3000);
	});
});
