// src/components/OrderDashboard.tsx
import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';
import { Order } from '../types/order';

export const OrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Customer Orders</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.order_id} className="border p-4 rounded shadow text-gray-900">
            <div className="flex justify-between">
              <h2 className="font-bold">{order.customer_name}</h2>
              <span className="text-gray-600">#{order.order_id}</span>
            </div>
            <div className="mt-2">
              <p>Quantity: {order.quantity}</p>
              <p>Total: ${order.total_amount}</p>
              <p>Ship to: {order.ship_to}</p>
              <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <div className="mt-2">
                Status:{' '}
                {order.status.is_delivered && <span className="bg-green-200 px-2 py-1 rounded">Delivered</span>}
                {!order.status.is_delivered && order.status.is_shipped && <span className="bg-purple-200 px-2 py-1 rounded">Shipped</span>}
                {!order.status.is_delivered && !order.status.is_shipped && order.status.is_processing && <span className="bg-blue-200 px-2 py-1 rounded">Processing</span>}
                {!order.status.is_delivered && !order.status.is_shipped && !order.status.is_processing && order.status.is_pending && <span className="bg-yellow-200 px-2 py-1 rounded">Pending</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};