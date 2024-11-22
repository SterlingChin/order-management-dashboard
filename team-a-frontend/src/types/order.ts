export interface OrderItem {
    productId: string;
    quantity: number;
  }
  
  export interface Order {
    order_id: string;
    customer_name: string;
    quantity: number;
    order_date: string;
    status: {
      is_pending: boolean;
      is_processing: boolean;
      is_shipped: boolean;
      is_delivered: boolean;
    };
    ship_to: string;
    total_amount: number;
  }
  
  export interface OrderInput {
    customerName: string;
    items: OrderItem[];
    totalAmount: number;
    status: Order['status'];
  }