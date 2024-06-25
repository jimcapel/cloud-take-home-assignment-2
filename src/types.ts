export type Booking = {
  id: string;
  partitionKey: string;
  timestamp: number;
  type: string;
  booking_completed: {
    timestamp: number;
    product_provider: string;
    orderId: number;
  };
};

export type BookingToPublish = {
  product_order_id_buyer: number;
  timestamp: string;
  product_provider_buyer: string;
};
