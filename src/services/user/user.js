const User = require('../../models/user');
const Account = require('../../models/account');

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

	static async getUserById(id) {
		return await this._getUser(id, null, null);
	}

	static async getUserByEmail(email) {
		return await this._getUser(null, email, null);
	}

	static async addAccount(id, account) {
		try {
			const user = await this.getUserById(id);
			const newAccount = new Account(account);
			await newAccount.save();
			user.accounts.push(newAccount._id);
			await user.save();
			return newAccount;
		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			throw err;
		}
	}

	static async getAccounts(id) {
		const user = await this.getUserById(id);
		return (await user.populate('accounts', '-_id -updatedAt -__v'))
			.accounts;
	}
};
