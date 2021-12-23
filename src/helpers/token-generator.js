const crypto = require('crypto');

module.exports = (size) => {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(size, async (err, buffer) => {
			if (err) {
				const error = new Error('Failed to Generate Token');
				error.statusCode = 500;
				reject(error);
			}

			resolve(buffer.toString('hex'));
		});
	});
};
