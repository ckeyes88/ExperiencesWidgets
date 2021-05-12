/** @jsx h */
import { h, render, ComponentFactory } from "preact";
import "ts-polyfill";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { App, AppProps } from "./Components/App";
import { mountComponent } from "../Utils/mount";

const queryParams = new URL(location.href).searchParams;

//Proxied version of application will have autoOpen query param, otherwise we are
//being mounted in original full-page.liquid template
if (queryParams.has("autoOpen")) {
  /**
   * Mounts an instance of the widget component to the found HTML element.
   */
  const mountWidget = (component: ComponentFactory<AppProps>, el: Element) => {
    try {
      const urlParams = new URL(location.href).searchParams;
      const baseUrl = urlParams.get("baseUrl");
      const languageCode = urlParams.get("lang");
      const shopUrl = urlParams.get("shopUrl");
      const shopifyProductId = urlParams.get("productId");
      const autoOpen = urlParams.get("autoOpen");

      if (!baseUrl) {
        throw new Error("baseUrl must be specified to load the widget.");
      }
      if (!languageCode) {
        throw new Error("languageCode must be specified to load the widget.");
      }
      if (!shopUrl) {
        throw new Error("shopUrl must be specified to load the widget.");
      }
      if (!shopifyProductId) {
        throw new Error(
          "shopifyProductId must be specified to load the widget.",
        );
      }
      const props: AppProps = {
        baseUrl,
        languageCode,
        shopUrl,
        shopifyProductId: parseFloat(shopifyProductId),
        autoOpen: parseFloat(autoOpen),
      };
      render(h(component, props), el);
    } catch (err) {
      console.error(`Failed to mount the "full page" widget.`, err);
      return;
    }
  };

  mountWidget(App, document.getElementById("container"));
} else {
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
}
