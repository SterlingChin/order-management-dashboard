import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String, // No validation
  password: String, // No password hashing
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);