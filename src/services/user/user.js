const User = require('../../models/user');

module.exports = class UserService {
	static async _getUser(userId, email, username) {
		try {
			const user = await User.findOne({
				$or: [
					{ _id: userId },
					{ email: email },
					{ username: username },
				],
			});
			if (!user) {
				const error = new Error('User not Found');
				error.statusCode = 404;
				throw error;
			}

			return user;
		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			throw err;
		}
	}

	static async getUserByEmail(email) {
		return await this._getUser(null, email, null);
	}
};
