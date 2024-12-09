import { ShippingInfo } from '../../cart/shipping-info.interface';

export enum OrderStatus {
  OPEN = 'open',
  APPROVED = 'approved',
  CONFIRMED = 'confirmed',
  SENT = 'sent',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface StatusHistory {
  status: OrderStatus;
  timestamp: string;
  comment: string;
}

export interface Order {
  id?: string;
  address: ShippingInfo;
  cart: {
    items: unknown[];
    [key: string]: unknown;
  };
  statusHistory: StatusHistory[];
}
