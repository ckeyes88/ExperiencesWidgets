### Aggregate Calendar View

This widget shows all possible experiences that a shop offers on a single page. There are two modes: Month and List. Both will depict upcoming events starting from now and onwards. Clicking on a given event will redirect a user to an experience home page with a scheduler open and timeslot selected. Clicking on a day cell will bring up a full list of events taking place that day.

### Installation

#### Add a new template

1. Firstly, you need to open your Theme's code. Chances are, you've done that before:
2. Under `Sales Channels` click on `Online Store`, then `Themes`
3. On the right side of the screen click on `Actions` dropdown, then `Edit Code`
4. In the file tree, under `Templates` folder icon click `Add new template`
5. Give a name for your template and past the following content into it:
```
<div data-expapp-aggregate-view
    data-expapp-aggregate-view-shop="{{ shop.permanent_domain }}"
    data-expapp-aggregate-view-shop-url="{{ shop.permanent_domain }}"
    data-expapp-aggregate-view-base-url="https://prod-v2-api.experiencesapp.services">
</div>

<style>
  :root {
    /*
      Modifying these colors will have no effect on Internet Explorer and other older browsers
      see here for more information https://caniuse.com/#search=css%20variables
    */
    --experiences-primary-background: #fff;
    --experiences-secondary-background: #f5f5f5;
    --experiences-primary-action: #505dbf;
    --experiences-secondary-text: #637381;
    --experiences-placeholder-color: #a0acb7;
    --experiences-disabled-background: #ccc;
    --experiences-disabled-text: #888;
  /*
    default colors
    --experiences-primary-background: #fff;
    --experiences-secondary-background: #f5f5f5;
    --experiences-primary-action: #505dbf;
    --experiences-secondary-action: #5c6ac4;
    --experiences-placeholder-color: #a0acb7;
    --experiences-disabled-background: #ccc;
    --experiences-disabled-text: #888;
  */
  }
</style>
<link href="//prod-v2.experiencesapp.services/storefront/embedded.css" rel="stylesheet" />

<link href="prod-v2.experiencesapp.services/dist/aggregateView.css" rel="stylesheet" />
<script src="prod-v2.experiencesapp.services/dist/aggregateView.js"></script>
```
6. Update your styling if you made any modifications
7. Click `Save`
8. Make note of the new template name


##### Add a new page

Now that we created a template, we want to link it to a new page.

1. On the menu on your left, find `Pages` under `Online Store` menu
2. Click `Add Page` button in the top right corner
3. Set new page's `Title` - it will appear in your shop alongside existing `Home`, `Catalog` etc.
4. Make sure `Visibility` toggle set to desired setting
5. Select `Template suffix` from the dropdown on your right to the newly created template
6. Click `Save`

If you set `Visibility` to `Visible`, it should appear on your store page after a refresh