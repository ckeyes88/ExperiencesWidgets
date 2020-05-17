
/**
 * Loads a specified widget code into the website
 * 
 * @param keyAttribute The attribute id that represents that widget
 * @param scriptPath The url to the widget code
 */
function loadExpAppWidget(keyAttribute: string, scriptPath: string): void {
  const mountPoints = document.querySelectorAll(keyAttribute);
  
  if (mountPoints.length > 0) {
    let script = document.createElement("script");
    script.src = scriptPath;    
    document.body.appendChild(script);    
  }
}
const baseUrl = "__BASE_URL__/__NODE_ENV__";
loadExpAppWidget("[data-expapp-gallery]", `${baseUrl}/expappListView.js`);
loadExpAppWidget("[data-expapp-calendar-booking-form]", `${baseUrl}/calendarBookingForm.js`);
