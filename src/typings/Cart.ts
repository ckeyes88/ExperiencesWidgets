export type Cart = {
  items: {
    id: number;
    quantity: number;
    properties: {
      When: string;
    }
  }[];
};