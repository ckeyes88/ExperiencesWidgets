/** @jsx h */
import { h, render, ComponentFactory } from "preact";
import "ts-polyfill";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { App, AppProps } from "./Components/App";

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
      throw new Error("shopifyProductId must be specified to load the widget.");
    }
    const props: AppProps = {
      baseUrl: `//${baseUrl}`,
      languageCode,
      shopUrl,
      shopifyProductId,
    };
    render(h(component, props), el);
  } catch (err) {
    console.error(`Failed to mount the "full page" widget.`, err);
    return;
  }
};

mountWidget(App, document.getElementById("container"));
