'use strict'

// Global Constants
const hours = ["6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm",
  "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm"];

const projections = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

document.body.id = 'root';  // My idea, however, ChatGPT for proper syntax.

// Helper Functions

function isSales() {
  // Had to refactor because of how submit works.
  return window.location.pathname.endsWith('sales.html');
}


function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createAppend(element, elementID, text, parentID) {
  let newElement = document.createElement(element);
  if (text != null) {
    newElement.textContent = text;
  }
  if (elementID != null) {
    newElement.id = elementID;
  }
  // Catch if the parent is null and if it is append to root.
  if (parentID != null) {
    let parentElement = document.getElementById(parentID);
    parentElement.appendChild(newElement);
  } else {
    parentElement = document.getElementById('root');
    parentElement.appendChild(newElement);
  }
}

function Location(shopLocation, minCustomers, maxCustomers, averageSales, locationInfo) {
  // This is the location constructor
  this.shopLocation = shopLocation;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.averageSales = averageSales;
  this.totalSales = 0;
  this.locationInfo = locationInfo;

  // Prototype functions
  this.hourlySales = this.generateHourlySales();

}

Location.prototype.generateHourlySales = function () {
  let tmpArray = [];
  for (let hour in hours) {
    let randomSales = Math.ceil(randomInRange(this.minCustomers, this.maxCustomers) * this.averageSales);
    // Account for flux - stretch goal
    randomSales = Math.ceil(randomSales * projections[hour] + randomSales);
    this.totalSales += randomSales;
    tmpArray.push(randomSales);
  }
  return tmpArray;
}

// Have to do this outside the render function or it will make a table for each location.
function createTableHeader() {
  createAppend('table', 'table-main', null, 'root');
  createAppend('thead', 'header-main', null, 'table-main');
  createAppend('tr', 'headrow', 'Locations', 'table-main');
  for (let hour in hours) {
    createAppend('th', null, hours[hour], 'headrow');
  }
  createAppend('th', 'th-daily-totals', 'Daily Location Total', 'headrow');
}

let hourByHour = [];
let hourByHourTotal = 0;
// There has to be a better way for this...
for (let hour in hours) {
  hourByHour[hour] = 0;
}

function createTableFooter() {

  let tfoot = document.getElementById('table-footer');

  if (tfoot) {
    tfoot.remove();
  }

  createAppend('tfoot', 'table-footer', 'Hourly Totals for All Locations', 'table-main');
  for (let hour in hours) {
    createAppend('td', null, hourByHour[hour], 'table-footer');
  }
  createAppend('td', null, hourByHourTotal, 'table-footer');
}

function createTableBody() {
  createAppend('tbody', 'data-row', '', 'table-main');
}

Location.prototype.render = function () {
  createAppend('tr', 'table-row-' + this.shopLocation, this.shopLocation, 'data-row');
  for (let hour in hours) {
    createAppend('td', 'tableData', this.hourlySales[hour], 'table-row-' + this.shopLocation);
    hourByHour[hour] = this.hourlySales[hour] + hourByHour[hour];
    hourByHourTotal += this.hourlySales[hour];
  }
  createAppend('td', 'totalSales', this.totalSales, 'table-row-' + this.shopLocation);
}

// Location objects & Helpers

const locationInfo = {
  'Seattle': {
    'name': 'Seattle',
    'address1': '1701 Space Center Dr',
    'address2': 'Seattle, Washington',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '867-5309',
  },
  'Tokyo': {
    'name': 'Tokyo',
    'address1': '2554 MrRoboto Way',
    'address2': 'Tokyo, Japan',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '369-2121',
  },
  'Dubai': {
    'name': 'Dubai',
    'address1': '1111 Tallest Building Drive',
    'address2': 'Dubai, United Arab Emirates',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '871-3838',
  },
  'Paris': {
    'name': 'Paris',
    'address1': '1 I Fell Way',
    'address2': 'Paris, France',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '432-7878',
  },
  'Lima': {
    'name': 'Lima',
    'address1': '2354 Plaza Way',
    'address2': 'Lima, Peru',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '413-9723',
  }
};

const locations = [
  new Location('Seattle', 23, 65, 6.3, locationInfo.Seattle),
  new Location('Tokyo', 3, 23, 1.2, locationInfo.Tokyo),
  new Location('Dubai', 11, 38, 3.7, locationInfo.Dubai),
  new Location('Paris', 20, 38, 2.3, locationInfo.Paris),
  new Location('Lima', 2, 16, 4.6, locationInfo.Lima),
];

// Helper functions


// This should only work on the sales page.
// sales.html stuff

function handleSubmit(event) {
  // Why don't I get code completion here??? Specifically with event?

  // Prevent the default html behaviour on submit and clear the form.
  event.preventDefault();

  // Gather all the data and use the Location constructor.
  // shopLocation, minCustomers, maxCustomers, averageSales, locationInfo

  const locationName = event.target.locationName.value;
  const minCustomers = event.target.minCustomers.value;
  const maxCustomers = event.target.maxCustomers.value;
  const averageSales = event.target.avgSales.value;
  const locationInfo = null;

  const newShop = new Location(locationName, minCustomers, maxCustomers, averageSales, locationInfo);
  locations.push(newShop);

  // This doesn't work as expected.
  newShop.render();
  createTableFooter();

  // Clear the form
  event.target.reset();
}

if (isSales()) {
  // Handle the add store form.
  const form = document.getElementById('addStoreForm');
  form.addEventListener('submit', handleSubmit);

  // Create the table.
  createTableHeader();
  createTableBody();
  // Create the objects
  for (let location of locations) {
    location.render();
  }
  createTableFooter();
}

// Index.html stuff
// Location.prototype.renderDetails = function () {
//   createAppend('h2', 'mystores', this.locationInfo.name, 'mystores');
//   createAppend('article', null, this.locationInfo.address1, 'mystores');
//   createAppend('article', null, this.locationInfo.address2, 'mystores');
//   createAppend('article', null, this.locationInfo.hours, 'mystores');
//   createAppend('article', null, this.locationInfo.contact, 'mystores');
//   createAppend('p', null, null, 'mystores');
// }

Location.prototype.renderDetails = function () {
  createAppend('h2', 'mystores', this.locationInfo.name, 'mystores');
  createAppend('article', null, 'Hours Open: ' + this.locationInfo.hours, 'mystores');
  createAppend('article', null, 'Contact Info:' + this.locationInfo.contact, 'mystores');
  createAppend('article', null, 'Location: ' + this.locationInfo.address1 + ' ' + this.locationInfo.address2, 'mystores');
  createAppend('p', null, null, 'mystores');
}

if (!isSales()) {
  createAppend('article', 'mystores', null, 'root');
  for (let location of locations) {
    location.renderDetails();
  }
}
