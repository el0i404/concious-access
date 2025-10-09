import sgMail from '@sendgrid/mail';

export const sendMailHandler = async (
  email: string,
  code: string,
  type: string
): Promise<void> => {
  sgMail.setApiKey(
    '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'
  );

  const html =
    type === 'registration'
      ? `
        <h2>Dear User,</h2>
        <p>Your Validation Code is <strong>${code}</strong>.</p>
        <p>Please <strong>do not share</strong> this code with anyone to ensure the security of your account.</p>
        <p>If you have any questions or require further assistance, feel free to reach out to our support team.</p>
        <br>
        <p>Best regards,</p>
        <p><em>AwarenessPass</em></p>
      `
      : type === 'forgotResend' &&
        `
        <h2>Dear User,</h2>
        <p>We received a request to reset your password. Please use the following temporary code to reset your password:</p>
        <p><strong>Reset Code: ${code}</strong></p>
        <p>Please note that this code is temporary and should not be shared with anyone.</p>
        <p>If you did not initiate this password reset request, please ignore this email or contact our support team immediately.</p>
        <br>
        <p>Best regards,</p>
        <p><em>AwarenessPass</em></p>
        `;

  const msg = {
    to: email,
    from: 'contact@awarenesspass.com',
    subject: 'Complete Your verification with OTP',
    html: html,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent successfully.');
    })
    .catch((error) => {
      console.error(error);
    });
};
