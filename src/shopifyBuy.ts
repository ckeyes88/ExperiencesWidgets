import Client from "shopify-buy";

export const sbClient = Client.buildClient({
  domain: "experiences-v2-dev-minh.myshopify.com",
  storefrontAccessToken: "9dec361f836641844a405d4cc773006b",
});