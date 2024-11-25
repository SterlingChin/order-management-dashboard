import { Order } from '../types/orders';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}; 