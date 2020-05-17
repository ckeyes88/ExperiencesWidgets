import { IObjectID } from "monk";

export type EventDBO = {
  _id: string;
  archivedAt: null | Date;
  bookingCutoffMs?: string;
  taxStatus: TaxStatus;
  confirmationEmailTemplateId: IObjectID | null;
  customOrderDetails: CustomOrderDetailsDBO | null;
  createdAt: Date;
  description: string;
  defaultEmailTemplateId?: IObjectID;
  endsAt?: Date;
  handle: string;
  hostImage?: EventAssetLinkDBO;
  hostDescription?: string;
  images: EventAssetLinkDBO[];
  languageCode: LanguageCode,
  location?: string;
  minLimit: number;
  maxLimit: number;
  name: string;
  orderUpdatedEmailTemplateId: IObjectID | null;
  orderCancelledEmailTemplateId: IObjectID | null;
  paymentType: PaymentType;
  publishedAt: null | Date
  reminderEmailTemplateId: IObjectID | null;
  summary: string;
  shopId: IObjectID;
  shopifyProductId: number | null;
  shopifyShopId: number;
  startsAt?: Date;
  tags: string[], // TODO: Determine how to keep these in sync with shopify tags
  ticketedEvent: boolean;
  ticketTemplateId: IObjectID | null;
  updatedAt: Date;
  variants: EventVariantDBO[],
};

export enum TaxStatus {
  ApplyTax = "ApplyTax",
  NoTax = "NoTax",
}

export type CustomOrderDetailsDBO = {
  formTitle?: string;
  formDescription?: string;
  formType: OrderDetailsFormType;
  fields?: FormFieldDefinitionDBO[];
};

export enum OrderDetailsFormType {
  None = "None",
  PerOrder = "PerOrder",
  PerAttendee = "PerAttendee",
}

export type FormFieldDefinitionDBO = {
  type: FormFieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
};

export enum FormFieldType {
  Text = "Text",
  Select = "Select",
  Email = "Email",
  Phone = "Phone",
}

export type EventAssetLinkDBO = {
  id: IObjectID;
  featured: boolean;
};

export enum PaymentType {
  Free = "free",
  Reservation = "reservation",
  Prepay = "prepay",
}

export type EventVariantDBO = {
  shopifyProductId?: number,
  shopifyVariantId?: number,
  name: string;
  price: number;
};

export enum LanguageCode {
  EnglishUS = "en-US",
  SpanishSpain = "es",
}
