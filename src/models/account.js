const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
	{
		title: String,
		url: String,
		user: String,
		password: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Account', accountSchema);
