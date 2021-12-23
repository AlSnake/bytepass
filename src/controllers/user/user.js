const UserService = require('../../services/user/user');

exports.getAccounts = async (req, res, next) => {
	try {
		const accounts = await UserService.getAccounts(req.userId);
		res.status(200).json({ accounts: accounts });
	} catch (err) {
		return next(err);
	}
};

exports.postAccounts = async (req, res, next) => {
	const { title, url, user, password } = req.body;

	try {
		const account = { title, url, user, password };
		await UserService.addAccount(req.userId, account);

		res.status(200).json({
			message: 'Successfully Created Account',
			account: account,
		});
	} catch (err) {
		return next(err);
	}
};
