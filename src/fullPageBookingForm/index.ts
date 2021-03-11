import "ts-polyfill";
import { App, AppProps } from "./App";
import { mountComponent } from "../Utils/mount";

mountComponent<AppProps>({
  dataName: "expapp-full-page-booking-form",
  formatData(data) {
    if (!data.fullPageBookingFormShopUrl) {
      throw new Error(
        "You must specify the [data-expapp-full-page-booking-form-shop-url] attribute for this widget to load",
      );
    }

    if (!data.fullPageBookingFormBaseUrl) {
      throw new Error(
        "You must specify the [data-expapp-full-page-booking-form-base-url] attribute for this widget to load",
      );
    }

    if (!data.fullPageBookingFormProductId) {
      throw new Error(
        "You must specify the [data-expapp-full-page-booking-form-product-id] attribute for this widget to load",
      );
    }

    return {
      baseUrl: data.fullPageBookingFormBaseUrl,
      shopUrl: data.fullPageBookingFormShopUrl,
      shopifyProductId: parseInt(data.fullPageBookingFormProductId),
      languageCode: data.fullPageBookingFormLanguageCode || "en-US",
    };
  },
  component: App,
});
