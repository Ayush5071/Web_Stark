import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw error;
  }
};

export const sendPaymentSuccessEmail = async (email, adTitle, paymentId) => {
  const subject = "Payment Successful";
  const text = `Your payment for the ad titled "${adTitle}" was successful. Payment ID: ${paymentId}`;
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Payment Successful</h2>
      <p>Thank you for your payment for the ad titled <strong>${adTitle}</strong>.</p>
      <p>Your Payment ID: <strong>${paymentId}</strong></p>
      <p>We appreciate your business!</p>
    </div>
  `;

  await sendEmail({ to: email, subject, text, html });
};
