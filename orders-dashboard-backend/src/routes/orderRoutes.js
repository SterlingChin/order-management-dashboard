import express from 'express';
import { createOrder, getOrders, getOrder, updateOrder } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getOrders);
router.post('/', authenticate, createOrder);
router.get('/:id', authenticate, getOrder);
router.put('/:id', authenticate, updateOrder);

export default router;
