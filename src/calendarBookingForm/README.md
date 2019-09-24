### Widget Development Status

![](https://www.dropbox.com/s/vzs85p2jhbefd6l/opening_modal.gif?raw=1)

#### Order Selection UI
The widget currently features full functionality for date selection from an interactive calendar component, timeslot selection, and variant/quantity selection.

##### Date Picker Features
![](https://www.dropbox.com/s/xz0b2mt9cfg93rj/calendar_cu.gif?raw=1)
* Calendar displays one whole month
* Navigation by month using forward and back arrows (no back arrow on current month)
* Navigation by year is not enabled
* Calendar fetches availability for current and next month on load
* On navigation to new month, calendar fetches availability for the month after (so availability is preloaded as user navigates forward)
* Past and unavailable dates are displayed in grey with a strikethrough
* Available dates are displayed in bold
* Current date is automatically selected on load

##### Timeslot List Features
![](https://www.dropbox.com/s/1l6elgc0hesem4l/date_selection.gif?raw=1)
* If the currently selected date has no availability (only possible for auto-selected current date), display a message and a "Go to next available" button
* "Go to next available" button selects next date with availability
* If currently selected date has availability, display date and a list of available timeslots
* Each timeslot displays the time, number of spots remaining, and a "Select" button
* Clicking "Select" displays the variant/quantity selection list for the given timeslot

##### Variant/Quantity Selection List Features
![](https://www.dropbox.com/s/hvibrchnpzosd7n/variant_selection_cu.gif?raw=1)
* List displays a "Back" button to de-select timeslot and return to the timeslot list
* List displays the currently selected date, timeslot, and number of spots left
* Number of spots left automatically updates to reflect current quantity selected
* Each variant displays the name (e.g. Adult, Child, etc.), price, and an "Add" button
* Clicking "Add" replaces the button with the current quantity desired (beginning with 1) and plus and minus buttons to increment/decrement quantity desired
* Increment buttons are disabled if merchant-specified maximum limit is reached
* When quantity desired is decremented down to zero, the "Add" button comes back
* The bottom of the list displays a dynamic total price for all quantities selected and a "Confirm" button
* The total price and confirm button do not display until at least one variant has been added
* The "Confirm" button remains disabled until merchant-specified minimum limit is satisfied (if applicable)
* Merchant-specified minimum and maximum limits are displayed at the bottom of the list (if applicable)

#### Order Confirmation UI
![](https://www.dropbox.com/s/89tkiyxpxzfj77a/CalendarFlowChart.png?raw=1)

Upon confirmation of the selected date, timeslot, and variants/quantities, the widget displays different forms (or none) depending on the event.

If the event requires prepayment, and the merchant has not created any custom forms, the widget modal will close and the user will be redirected to their cart containing the order.

##### Customer Details Form
![](https://www.dropbox.com/s/t0cvfv1v9m081a1/customer_info_small.png?raw=1)

In the case of non-prepay events, the purchaser's first name, last name, and email will be collected in a single form.

On submit, the modal will render any merchant-specified custom forms (if applicable).

If no custom forms exist, on submit will create the order in our DB, send a confirmation email to the address provided in the form, and display a confirmation message.

##### Custom Details Form
![](https://www.dropbox.com/s/ea2rzfqwt24si6j/custom_order_details_small.png?raw=1)

Merchants have the ability to specify custom forms with which to collect additional information. They also have the option to display these forms per-order (one form) or per-attendee (a form for each spot booked).

These forms can incorporate input fields (text, email, phone) and/or select fields with custom dropdown options.

If the form is per-attendee, First Name, Last Name, and Email fields will be added to capture attendee-specific data. If the form is per-order, only the merchant-specified fields will be included.

If the form is per-attendee, the form will display which attendee out of the total number of attendees the form is for, as well as the variant name (e.g. "2 out of 4, Senior").

Upon submission of the form (or the final form if per attendee), the order will be placed.

![](https://www.dropbox.com/s/jqo6ysem26neh6j/add_to_cart.gif?raw=1)

* In the case of a prepay event, this means closing the modal and redirecting to the cart with the order added

![](https://www.dropbox.com/s/lbhsip443dfy21o/free_confirmation.gif?raw=1)

* In the case of a non-prepay event, this means displaying a confirmation message and sending a confirmation email

##### Confirmation Message (if applicable)

In the case of a non-prepay event, a confirmation message will display upon completion of the order.

* Message confirms that the order has been created
* Message displays the email address to which a confirmation email was sent

### Work Needed
In order to make this widget production ready, work is needed in the following areas...

#### Styling/Responsiveness
Much fine-tuning is still needed for the various components at both desktop and mobile sizes.

#### Validation/Error Handling
The entire app needs to be looked through for potential errors, and those errors need to be handled accordingly.

* Checks for potential unexpected null values at any point throughout the process should be captured and handled
* All user inputs need to be validated and, bad/missing values should prevent the user from moving forward
* Errors returned by unsuccessful API calls should be captured and handled
* Errors should be captured within try/catch blocks
* In case of any error, a message should be generated and displayed, and the user should be provided options for how to proceed

### Other Considerations
After developing this widget, we feel that ceratain elements of the initial design/specification could be reconsidered...

* Custom forms should probably not add name/email fields automatically - merchants that want to create custom forms and need this data will presumably include the fields themselves, leading to potential duplicate fields on the custom form

