const mongoose = require('mongoose');
const ROLE = require('../helpers/role');

const userSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: Object.values(ROLE),
			default: ROLE.USER,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		verifiedEmail: {
			type: Boolean,
			required: true,
			default: false,
		},
		accounts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Account',
			},
		],
		emailVerifyCode: String,
		emailVerifyExpiry: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
