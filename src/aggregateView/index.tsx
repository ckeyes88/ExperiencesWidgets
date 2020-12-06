import "./index.scss";
import { mountComponent } from "../Utils/mount";
import { CalendarContainer } from "./Components/CalendarMain";

mountComponent({
  dataName: "expapp-aggregate-view",
  formatData(data) {
    if (!data.aggregateViewShopUrl) {
      throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load");
    }

    if (!data.aggregateViewBaseUrl) {
      throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load");
    }

    return { 
        ...data, 
        defaultVew: data.aggregateViewDefaultView,
        baseUrl: data.aggregateViewBaseUrl, 
        shopUrl: data.aggregateViewShopUrl, 
        languageCode: data.aggregateViewLanguageCode || "en-US",
    };
  },
  component: CalendarContainer,
});
