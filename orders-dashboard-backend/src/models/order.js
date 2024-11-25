import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: String, // No validation
  items: [{ 
    productId: String,
    quantity: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);