import nodemailer from "nodemailer";
export function sendPasswordResetEmail(email: string, userId: string) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.SMTP_MAIL,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: process.env.SMTP_MAIL,
		to: email,
		subject: "Password Reset Request",
		text: `Dear User,\n\nYou have requested a password reset. Please follow the instructions below to change your password:\n\n1. Visit our website at example.com.\n2. Click on the "Forgot Password" link.\n3. Enter your email address associated with your account.\n4. Follow the on-screen instructions to reset your password.\n\nCopy the hash below and paste it on the website\n${`http://localhost:5713/account/reset/${userId}`}\n If you did not request a password reset, please ignore this email.\n\nBest regards,\nThe RRspares Team`,
		html: ` <html>
                    <body>
                      <h2>Dear User,</h2>
                      <p>You have requested a password reset. Please follow the instructions below to change your password:</p>
                      <ol>
                        <li>Visit our website at <a href="http://example.com">example.com</a>.</li>
                        <li>Click on the "Forgot Password" link.</li>
                        <li>Enter your email address associated with your account.</li>
                        <li>Follow the on-screen instructions to reset your password.</li>
                      </ol>
                      <p>Copy the hash below and paste it on the website<p/>
                      <strong>${`http://localhost:5173/account/reset/${userId}`}<strong/>  
                      <p>If you did not request a password reset, please ignore this email.</p>
                      <p>Best regards,</p>
                      <p>The RRspares Team</p>
                    </body>
                </html>`,
	};

	return new Promise<boolean>((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return reject(error);
			}
			resolve(true);
		});
	});
}
