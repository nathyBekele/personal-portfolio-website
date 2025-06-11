import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Visitor from '@/models/Visitor';
import { UAParser } from 'ua-parser-js';
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

// HTML email template
const generateEmailTemplate = (message) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">A fresh visitor landed!</h2>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${message.split('\n').join('<br>')}
      </blockquote>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(country, message) {
  const mailOptions = {
    from: "Portfolio", 
    to: 'natnaelbekele142@gmail.com', 
    subject: `Someone just visited your portfolio from ${country}`, 
    text: message, 
    html: generateEmailTemplate(message),  
  };
  
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error while sending email:', error.message);
  }
};

export async function POST(req) {
  try {
    await connectDB();
    
    const data = await req.json();
    const { ip, userAgent, path, referrer } = data;
    
    // Parse user agent
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    // Fetch location data
    let country = 'Unknown';
    let city = 'Unknown';

    // Get current date and time in EAT (UTC+3)
    const now = new Date();
    const eatTime = new Date(now.getTime() + (3 * 60 * 60 * 1000)); // Add 3 hours for EAT
    
    try {
      const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
      const locationData = await response.json();
      // console.log('location data:', locationData);
      // console.log('locationData.countryName:', locationData.countryName);
      // console.log('locationData.cityName:', locationData.cityName);
      country = locationData.countryName || 'Unknown';
      city = locationData.cityName || 'Unknown';
    } catch (error) {
      console.error('Error fetching location data:', error);
    }

    const message = `Country: ${country}\nCity: ${city}\nOS: ${os.name}\nDate&Time: ${eatTime}`;

    try {
      //1 email per IP per minute
      try {
        await limiter.check(1, ip); 
      } catch {
        return NextResponse.json({
          success: false,
          message: 'Too many requests. Please try again later.',
        }, { status: 429 });
      }

      // Send email
      await sendEmail(country, message);
    } catch(error) {
      console.error('Error sending vistor data email: ', error);
    }
  
    // Create new visitor record
    const visitor = new Visitor({
      ip,
      userAgent,
      path,
      referrer,
      country,
      city,
      browser: browser.name,
      os: os.name,
      device: device.type || 'desktop'
    });
    
    await visitor.save();
    
    return NextResponse.json({ 
      success: true,
      visitor: {
        ...visitor.toObject(),
        country,
        city
      }
    });
  } catch (error) {
    console.error('Error saving visitor:', error);
    return NextResponse.json({ error: 'Failed to save visitor data' }, { status: 500 });
  }
} 