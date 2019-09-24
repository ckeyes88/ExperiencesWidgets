import { CustomerInputData } from "./CustomerInput";
import { OrderLineItemInputData } from "./OrderLineItemInput";

export type OrderInputData = {
  customer: CustomerInputData;
  lineItems: OrderLineItemInputData[];
};