/// <reference types="vite/client" />

import axios, { AxiosError } from 'axios';
import { Order } from '../types/orders'

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
      
      if ('message' in response.data && response.data.message === 'Order not found') {
        throw new APIError('Failed to fetch orders', 404);
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
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
  }
}