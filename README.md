# Experience App Widgets

It is our desire that the Experience App be more extensible and flexible so
that it can more quickly meet the needs of the merchent, who may need to create
views for their data outside of the standard embedded app in the product page.

To accomplish this, we've created a way for merchants and/or developers to create fully
customized widgets that can be embedded into either their shopify liquid templates or
in any other HTML document.

# Creating your own widget
A new custom widget requires only a few simple components. This example uses typescript and preact
to create the widget.

- A Preact view layer bundled into a single `<widget_name>.js` file. (preact for bundle size optimization)
- A main mounting script to select the dom element to mount the widget to and to pass in 
any required data for the application
- A single HTML element to mount the widget to

### Loading the widget
First import the script and any styles for your custom widget in the HTML. Then create a dom element where you would like to mount the widget. You can place this element multiple times wherever you would like the widget to appear. You can also vary the data between elements if your widget has the ability to be customized via external parameters passed in as data attributes.

> ##### Coming soon - secure access to a public graphql api 
> You will soon be able to pass in your Experience App client token as the value for 
your widget's name. This will be required for all requests to the Experiences App public GraphQL
server

```html
<!-- Optional styles for your widget -->
<link href="/index.css" rel="stylesheet" />

<!-- DOM node to mount your widget -->
<div data-example-my-widget data-example-my-config-value="5"></div>

<!-- script to load the preact application for you widget -->
<script src="/widgets.js"></script>
```

### Building the widget
Create the appearance of your widget by creating a small Preact component that can be
mounted to your html DOM element. Preact is a drop in replacement for the commonly used
React (more info can be found [here](https://preactjs.com/). This application will be 
mounted to your dom element and can receive some or all of your custom data attributes.
```tsx
// Components/ExampleWidget.tsx
import { h, Component } from 'preact';

export interface IExampleWidgetProps {
  configValue: number
}

export interface IExampleWidgetState {
}


export class ExampleWidget extends Component<IExampleWidgetProps, IExampleWidgetState> {
    public static defaultProps: Partial<IExampleWidgetProps> = {
        configValue: 3
    }

    public render() {
        return (
            <div>
                Hello World!
            </div>
        );
    }
}
```

### Mounting the widget
Using the `mountComponent` script that's provided in the shared `Utils` directory you can tell the widget sdk how to pull in and validate any configuration variables as well as which component should be mounted.
```ts
// index.tsx
import { MyWidget } from "./Containers/MyWidget/MyWidget";
import "./index.scss";
import { mountComponent } from "../Utils/mount";

mountComponent({
    dataName: "data-example",
    formatData(data) {
        if (!data.exampleMyData) {
            throw new Error("You must specify the [data-example-my-data] attribute for this widget to load");
        }
        return { ...data, myData: data.exampleMyData };
    },
    component: MyWidget,
});
```

### Styling the widget
Depending on how flexible you want your widget styles to be you can either 
use inline styles in your Preact components or embed a css file in the same
page as your widget.

##### Option 1
```tsx
import { h, Component } from 'preact';

export interface IExampleWidgetProps {
}

export interface IExampleWidgetState {
}

const styles = {
  main: {
    backgroundColor: "blue"
  }
}
export class ExampleWidget extends Component<IExampleWidgetProps, IExampleWidgetState> {

    public render() {
        return (
            <div style={styles.main}>
                Hello World!
            </div>
        );
    }
}
```

##### Option 2
```html
<link href="/index.css" rel="stylesheet" />
<!--...Other html -->
<div data-example-my-widget data-example-my-config-value="5"></div>
```

### Contributing
This repo is under heavy development and may have breaking changes at times. We will do our best to keep things working as much as possible. We're also always open to the community submitting PR's and contributing to the improvement of this code. If you come across any issues and/or missing features we welcome your PR's to address them!

### Contact
For bugs and feature requests, please use github issues. For further questions for the Experiences App Team please submit an email to `hello@experiencesapp.com` and we will try to respond within 24hrs.
