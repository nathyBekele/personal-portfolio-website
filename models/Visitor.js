import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  path: String,
  referrer: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String
});

export default mongoose.models.visitersData || mongoose.model('visitersData', visitorSchema); 