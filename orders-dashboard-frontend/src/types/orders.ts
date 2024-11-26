export interface Order {
  order_id: string;
  customer_name: string;
  quantity: number;
  items: {
    item_id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  order_date: string;
  status: {
    is_delivered: boolean;
    is_shipped: boolean;
    is_processing: boolean;
    is_pending: boolean;
  };
  ship_to: string;
  subtotal_amount: number;
  local_tax: number;
  total_amount: number;
}

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch('VITE_API_BASE_URL/orders');
    const data: Order[] = await response.json();
    return data;
  }
};