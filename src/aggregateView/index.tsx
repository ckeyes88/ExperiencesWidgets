import "ts-polyfill";
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

//     if (!data.aggregateViewProductId) {
//       throw new Error("You must specify a product id for this widget to work");
//     }

    return { 
        ...data, 
        defaultView: data.aggregateViewDefaultView,
        baseUrl: data.aggregateViewBaseUrl, 
        shopUrl: data.aggregateViewShopUrl,
        //shopifyProductId: parseInt(data.aggregateViewProductId),
        languageCode: data.aggregateViewLanguageCode || "en-US",
        mainHeader: data.aggregateViewMainHeader,
    };
  },
  component: CalendarContainer,
});
