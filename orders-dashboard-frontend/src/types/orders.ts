export interface Order {
  id: string;
  order_id: string;
  customer_name: string;
  quantity: number;
  total_amount: number;
  ship_to: string;
  order_date: string;
  status: {
    is_delivered: boolean;
    is_shipped: boolean;
    is_processing: boolean;
    is_pending: boolean;
  };
}

export interface OrderResponse {
  example: Order[];
}

// services/orderService.ts
export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch('VITE_API_BASE_URL/orders');
    const data: OrderResponse = await response.json();
    return data.example;
  }
};