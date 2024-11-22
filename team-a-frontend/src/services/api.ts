/// <reference types="vite/client" />

import axios, { AxiosError } from 'axios';
import { Order, OrderInput } from '../types/order';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get<Order[]>('/orders');
      
      // Have to handle weird 200 responses that might actually be errors
      if ('message' in response.data && response.data.message === 'Order not found') {
        throw new APIError('Failed to fetch orders', 404);
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Need extra error handling due to inconsistent API responses
        if (error.response?.status === 500) {
          throw new APIError(
            'Unable to fetch orders. Please try again later.',
            500,
            error
          );
        }
      }
      throw new APIError('An unexpected error occurred', undefined, error);
    }
  },

  async createOrder(orderData: OrderInput): Promise<Order> {
    try {
      const response = await api.post<Order>('/orders', orderData);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Have to guess at error causes due to generic 500 responses
        if (error.response?.status === 500) {
          throw new APIError(
            'Unable to create order. Please check your input.',
            500,
            error
          );
        }
      }
      throw new APIError('Failed to create order', undefined, error);
    }
  },

  async getOrder(id: string): Promise<Order> {
    try {
      const response = await api.get<Order | { message: string }>(`/orders/${id}`);
      
      // Handle the problematic "200 OK" for not found
      if ('message' in response.data && response.data.message === 'Order not found') {
        throw new APIError(`Order ${id} not found`, 404);
      }
      
      return response.data as Order;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Failed to fetch order', undefined, error);
    }
  }
};
