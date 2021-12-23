const nodemailer = require('nodemailer');
const MailConfig = require('../../config/mail');

const mailTransporter = nodemailer.createTransport(MailConfig.smtp);

module.exports = class EmailService {
	static async send(from, to, subject, body) {
		return mailTransporter.sendMail({
			from: from,
			to: to,
			subject: subject,
			html: body,
		});
	}
};
