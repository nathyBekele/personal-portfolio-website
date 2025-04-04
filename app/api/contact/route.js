import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/utils/rate-limit';

// Add rate limiter instance
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max number of unique tokens per interval
});

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
};

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;

  // console.log('Attempting to send email with payload:', {
  //   name,
  //   email,
  //   messageLength: userMessage.length,
  //   envEmail: process.env.EMAIL_ADDRESS,
  //   // Don't log the actual password/key
  //   GmailKey: process.env.GMAIL_APP_PASSWORD
  // });
  
  const mailOptions = {
    from: "Portfolio", 
    to: 'natnaelbekele142@gmail.com', 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
};

export async function POST(request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    
    try {
      await limiter.check(5, ip); // 5 requests per IP per minute
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Too many requests. Please try again later.',
      }, { status: 429 });
    }

    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    // Add input validation
    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message are required.',
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format.',
      }, { status: 400 });
    }

    // Check message length
    if (userMessage.length > 1000) {
      return NextResponse.json({
        success: false,
        message: 'Message is too long. Please keep it under 1000 characters.',
      }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    // Validate environment variables
    if (!token || !chat_id) {
      return NextResponse.json({
        success: false,
        message: 'Telegram token or chat ID is missing.',
      }, { status: 400 });
    }

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send Telegram message
    const telegramSuccess = await sendTelegramMessage(token, chat_id, message);

    // Send email
    const emailSuccess = await sendEmail(payload, message);

    let successMessage = '';
    if (emailSuccess) successMessage += 'Email sent successfully! ';
    if (telegramSuccess) successMessage += 'Telegram message sent successfully! ';

    if (emailSuccess || telegramSuccess) {
      return NextResponse.json({
        success: true,
        message: successMessage.trim(),
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send both Telegram message and email.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};