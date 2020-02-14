import { CarouselWidget } from "./Containers/CarouselWidget/CarouselWidget";
import "./index.scss";
import { mountComponent } from "../Utils/mount";
type data = {
  galleryShopUrl?: string;
  galleryBaseUrl?: string;
}
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