import { h, render, ComponentFactory } from "preact";

export type RawAttributeData = {
  [key: string]: string;
};

export type MountComponentConfig<DataProps extends object> = {
  /** The name used as the data-prefix for mounting this component. */
  dataName: string;
  /** Validate and format the found data-elements per element and supply defaults if necessary. */
  formatData?(data: RawAttributeData): DataProps;
  /** The component class that will be mounted per instance. */
  component: ComponentFactory<DataProps>;
};

/**
 * Default function for validating data, casts the partial to the concrete type though
 * this may result in some data properties not actualling being present!
 */
function defaultFormatData<T>(data: RawAttributeData) {
  return data as unknown as T;
}

/**
 * Mounts a component using HTML data-attributes.
 */
export function mountComponent<DataProps extends object = {}>({
  dataName,
  component,
  formatData = defaultFormatData,
}: MountComponentConfig<DataProps>) {

  /**
   * Alias this as C so we can use it with the JSX.
   */
  // @ts-ignore
  const C = component;

  /**
   * Attempts to read all of the related data- config values from the element for the
   * widget.
   */
  const readConfigData = (el: Element) => {
    let output: RawAttributeData = {};
    for (let i = 0; i < el.attributes.length; i++) {
      let attr = el.attributes[i];

      if (attr.nodeName.indexOf(`data-${dataName}-`) === 0) {
        const name = snakeToCamel(attr.nodeName.slice(12));
        output[name] = attr.nodeValue;
      }
    }
    return output;
  };

  /**
   * Mounts an instance of the widget component to the found HTML element.
   */
  const mountWidget = (el: Element) => {
    try {
      const config = formatData(readConfigData(el));
      render(h(component, config), el);
    } catch (err) {
      console.error(`Failed to mount the "${dataName}" widget.`, err);
      return;
    }
  };

  const mountPoints = document.querySelectorAll(`[data-${dataName}]`);
  for (let i = 0; i < mountPoints.length; i++) {
    mountWidget(mountPoints[i]);
  }
}

/**
 * Converts snake-case to camelCase.
 * TODO: This should exist in utils rather than in this file.
 */
function snakeToCamel(s: string): string {
  return s.replace(/(\-\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}