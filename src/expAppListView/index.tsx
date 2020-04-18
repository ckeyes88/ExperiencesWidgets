import { mountComponent } from "../Utils/mount";
import { EventsListWidget } from "./Containers/EventsListWidget/EventsListWidget";
import "./index.scss";

type Data = {
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  galleryShopUrl?: string;
  /** Base URL of the app API (eg: coolshop.myshopify.com/api) */
  galleryBaseUrl?: string;
  /**  */
  galleryMonthsPerPage: string;
  /**  */
  galleryTimeslotsPerMonth: string;
};

mountComponent({
  dataName: "expapp-gallery",
  formatData({
    galleryBaseUrl,
    galleryShopUrl,
    galleryMonthsPerPage,
    galleryTimeslotsPerMonth,
  }: Data) {        
    // Bail if require data attribute is not provided
    if (!galleryShopUrl) {
      throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load.");
    }

    // Bail if require data attribute is not provided
    if (!galleryBaseUrl) {
      throw new Error("You must specify the [data-expapp-base-url] attribute for this widget to load.");
    }

    // Pass props to mounted events list widget
    return { 
      baseUrl: galleryBaseUrl, 
      shopUrl: galleryShopUrl, 
      monthPerPage: galleryMonthsPerPage ? Number.parseInt(galleryMonthsPerPage) : undefined,
      timeslotsPerLoad: galleryTimeslotsPerMonth ? Number.parseInt(galleryTimeslotsPerMonth) : undefined,
    };
  },
  component: EventsListWidget,
});