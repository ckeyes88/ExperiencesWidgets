export type Cart = {
  items: {
    id: number;
    quantity: number;
    product_id: number;
    properties: {
      When: string;
      Timeslot: string;
    }
  }[];
};