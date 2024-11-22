import Order from '../models/order.js';
export const getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      // Generic error with no details
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const createOrder = async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      // Wrong status code for creation (should be 201)
      res.status(200).json(order);
    } catch (error) {
      // Same generic error for all issues
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        // Wrong status code for not found (returns 200 instead of 404)
        return res.status(200).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!order) {
        // Inconsistent error handling
        return res.status(500).json({ error: 'Update failed' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  