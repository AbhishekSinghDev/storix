import { sendMail } from "./mail";

export const sendVerificationEmail = async (email: string, otp: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2>Verify Your Email</h2>
      <p>Thank you for registering with Storix! Please use the following OTP to verify your email address:</p>
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
        <strong>${otp}</strong>
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this verification, please ignore this email.</p>
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated email, please do not reply.</p>
    </div>`;

  return await sendMail({
    to: email,
    subject: "Verify Your Email - Storix",
    html,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2>Reset Your Password</h2>
      <p>You requested to reset your password. Click the button below to set a new password:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetLink}" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </div>
      <p>If you didn't request this reset, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated email, please do not reply.</p>
    </div>
  `;

  return await sendMail({
    to: email,
    subject: "Reset Your Password - Storix",
    html,
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Storix!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for joining Storix! We're excited to have you on board.</p>
      <p>With Storix, you can:</p>
      <ul>
        <li>Securely store and manage your files</li>
        <li>Share files easily with others</li>
        <li>Access your files from anywhere</li>
      </ul>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated email, please do not reply.</p>
    </div>
  `;

  return await sendMail({
    to: email,
    subject: "Welcome to Storix!",
    html,
  });
};
