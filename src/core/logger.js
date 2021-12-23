const winston = require('winston');
const { format } = require('winston');
const path = require('path');

const logdir = path.dirname(require.main.filename).replace(/src/g, 'logs');

const logger = winston.createLogger({
	format: format.combine(format.splat(), format.simple()),
	transports: [
		new winston.transports.Console({ json: false, timestamp: true }),
		new winston.transports.File({
			filename: logdir + '/debug.log',
			json: false,
		}),
	],
	exceptionHandlers: [
		new winston.transports.Console({
			json: false,
			timestamp: true,
			stack: true,
		}),
		new winston.transports.File({
			filename: logdir + '/exceptions.log',
			json: false,
		}),
	],
	exitOnError: false,
});

module.exports = logger;
