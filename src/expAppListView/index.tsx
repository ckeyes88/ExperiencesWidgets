import { CarouselWidget } from "./Containers/CarouselWidget/CarouselWidget";
import "./index.scss";
import { mountComponent } from "../Utils/mount";

mountComponent({
    dataName: "expapp-gallery",
    formatData(data) {
        if (!data.galleryShopUrl) {
            throw new Error("You must specify the [data-expapp-shop-url] attribute for this widget to load");
        }
        return { ...data, shopUrl: data.galleryShopUrl, baseUrl: data.galleryBaseUrl };
    },
    component: CarouselWidget,
});