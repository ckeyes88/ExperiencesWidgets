import "./index.scss";
import { mountComponent } from "../Utils/mount";
import { CalendarContainer } from "./Components/CalendarMain";

mountComponent({
  dataName: "expapp-aggregate-view",
  formatData(data) {
      console.log("data from expapp-aggregate-view is ", data);
    // if (!data.calendarBookingFormShopUrl) {
    //   throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load");
    // }

    // if (!data.calendarBookingFormBaseUrl) {
    //   throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load");
    // }

    // if (!data.calendarBookingFormProductId) {
    //   throw new Error("You must specify a product id for this widget to work.");
    // }
    
    // if (!data.calendarBookingFormProductId) {
    //   throw new Error("You must specify a product id for this widget to work");
    // }

    return { 
        ...data, 
        baseUrl: data.aggregateViewBaseUrl, 
        storefrontAccessToken: data.aggregateViewStorefrontAccessToken,
        shopUrl: data.aggregateViewShopUrl, 
        languageCode: data.aggregateViewLanguageCode || "en-US",
    };
  },
  component: CalendarContainer,
});
