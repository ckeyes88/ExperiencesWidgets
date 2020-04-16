import { CarouselWidget } from "./Containers/CarouselWidget/CarouselWidget";
import { mountComponent } from "../Utils/mount";
import "./index.scss";

type data = {
  /** The URL of the shop (eg: coolshop.myshopify.com) */
  galleryShopUrl?: string;
  /** Base URL of the app API (eg: coolshop.myshopify.com/api) */
  galleryBaseUrl?: string;
};

mountComponent({
  dataName: "expapp-gallery",
  formatData(data: data) {    
    if (!data.galleryShopUrl) {
      throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load.");
    }

    if (!data.galleryBaseUrl) {
      throw new Error("You must specify the [data-expapp-base-url] attribute for this widget to load.");
    }
    return { ...data, shopUrl: data.galleryShopUrl, baseUrl: data.galleryBaseUrl };
  },
  component: CarouselWidget,
});