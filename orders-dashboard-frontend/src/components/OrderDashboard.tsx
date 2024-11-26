// src/components/OrderDashboard.tsx
import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';
import { Order } from '../types/orders';

export const OrderDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError(null);
        const data = await orderService.getOrders();
        setOrders(data.example || []);
        console.log(data);
      } catch (error: any) {
        console.error('Failed to fetch orders:', error);
        setError({
          code: error.response?.data?.error?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.error?.message || 'An unexpected error occurred'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-red-800 font-medium">{error.code}</h3>
              <p className="text-red-600">{error.message}</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-gray-800 font-medium mb-1">No Orders Found</h3>
          <p className="text-gray-600">There are currently no orders to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Customer Orders</h1>
        <div className="flex gap-4 items-center">
          <input
            type="search"
            placeholder="Search orders..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg border">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.order_id} className="border p-4 rounded shadow text-gray-900">
            <div className="flex justify-between items-center pb-3 border-b mb-3">
              <h2 className="font-bold text-lg">{order.customer_name}</h2>
              <span className="text-gray-600">Order #{order.order_id}</span>
            </div>
            <div className="flex justify-between gap-6">
              {/* Left Column - Order Details */}
              <div className="flex-1">
                <p className="text-sm text-gray-600">Ship to: {order.ship_to}</p>
                <p className="text-sm text-gray-600">Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <div className="mt-2">
                  Status:{' '}
                  {order.status.is_delivered && <span className="bg-green-200 px-2 py-1 rounded text-sm">Delivered</span>}
                  {!order.status.is_delivered && order.status.is_shipped && <span className="bg-purple-200 px-2 py-1 rounded text-sm">Shipped</span>}
                  {!order.status.is_delivered && !order.status.is_shipped && order.status.is_processing && <span className="bg-blue-200 px-2 py-1 rounded text-sm">Processing</span>}
                  {!order.status.is_delivered && !order.status.is_shipped && !order.status.is_processing && order.status.is_pending && <span className="bg-yellow-200 px-2 py-1 rounded text-sm">Pending</span>}
                </div>
              </div>

              {/* Right Column - Items and Totals */}
              <div className="flex-1">
                <div className="space-y-2">
                  <h3 className="font-medium">Items Ordered:</h3>
                  {order.items?.map((item) => (
                    <div key={item.item_id} className="flex justify-between text-sm">
                      <span>{item?.quantity}x {item?.name}</span>
                      <span>${item?.price?.toFixed(2) || '0.00'}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${order.subtotal_amount?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${order.local_tax?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${order.total_amount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};