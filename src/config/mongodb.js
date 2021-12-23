require('dotenv').config();

module.exports = {
	MONGODB_URI: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`,
};
