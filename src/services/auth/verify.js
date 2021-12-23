const EmailService = require('../communication/email');
const UserService = require('../user/user');
const tokenGenerator = require('../../helpers/token-generator');
const MailConfig = require('../../config/mail');

module.exports = class VerifyService {
	static async isEmailVerified(email) {
		try {
			return (await UserService.getUserByEmail(email)).verifiedEmail;
		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			throw err;
		}
	}

	static async sendEmailVerificationCode(email) {
		try {
			const verifyCode = await tokenGenerator(32);
			const body = `
                <p>BYTEPASS Email Verification</p>
                <p>Verify Code: ${verifyCode}</p>
                <p>Send a POST Request with body{email, code} to /api/auth/verify/email to verify your email</p>
            `;

			const user = await UserService.getUserByEmail(email);
			user.emailVerifyCode = verifyCode;
			user.emailVerifyExpiry = Date.now() + 600000;
			await user.save();

			return EmailService.send(
				MailConfig.general.noreply_email,
				email,
				'Bytepass Email Verification',
				body
			);
		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			throw err;
		}
	}

	static async verifyEmail(email, code) {
		try {
			const user = await UserService.getUserByEmail(email);

			if (user.emailVerifyCode !== code) {
				const error = new Error('Invalid Verification Code');
				error.statusCode = 422;
				throw error;
			}

			if (Date.now() > user.emailVerifyExpiry) {
				const error = new Error('Verify Code Expired');
				error.statusCode = 422;
				throw error;
			}

			user.verifiedEmail = true;
			user.emailVerifyCode = undefined;
			user.emailVerifyExpiry = undefined;
			return await user.save();
		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			throw err;
		}
	}
};
