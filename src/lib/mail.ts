import nodemailer from "nodemailer";
import { env } from "@/env";
import { generateOtp } from "./utils";
import { db } from "@/server/db";
import { sendVerificationEmail } from "./mail-template";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

type SendMailProps = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const sendMail = async ({ to, subject, text, html }: SendMailProps) => {
  try {
    const info = await transporter.sendMail({
      from: `"Storix" <${env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Failed to send email:", error);

    // Type guard for Error object
    if (error instanceof Error) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.name,
        },
      };
    }

    return {
      success: false,
      error: {
        message: "An unknown error occurred while sending email",
        code: "UNKNOWN_ERROR",
      },
    };
  }
};
