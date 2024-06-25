import { KinesisStreamEvent } from 'aws-lambda';
import { BookingToPublish, Booking } from './types';

export const handler = (event: KinesisStreamEvent) => {
  event.Records.forEach(async (record) => {
    // decode event data from base64 and parse into booking object
    const buf = Buffer.from(record.kinesis.data, 'base64');

    const decodedData = buf.toString('utf8');

    const booking: Booking = await JSON.parse(decodedData);

    if (booking.type !== 'booking_completed') return;

    // transform into server accepted schema

    const bookingToPublish: BookingToPublish = {
      product_order_id_buyer: booking.booking_completed.orderId,
      timestamp: new Date(booking.timestamp).toISOString(),
      product_provider_buyer: booking.booking_completed.product_provider,
    };

    // publish to server

    const response = await fetch(`${process.env.PUBLISH_URL}`, {
      method: 'POST',
      body: JSON.stringify(bookingToPublish),
    });

    // log the error message if publishing to server fails
    if (response.status !== 200) {
      const responseJSON = await response.json();
      console.log(responseJSON);
    }
  });
};
