
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a session title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a session description']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please specify the session category'],
    enum: ['technology', 'business', 'arts', 'languages', 'science']
  },
  date: {
    type: Date,
    required: [true, 'Please specify the session date']
  },
  time: {
    type: String,
    required: [true, 'Please specify the session time']
  },
  duration: {
    type: Number,
    required: [true, 'Please specify the session duration'],
    min: 30,
    max: 180
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  credits: {
    type: Number,
    required: true,
    default: 20
  }
}, {
  timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
