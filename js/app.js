'use strict'

// Global Constants
const hours = ["6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm",
  "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm"];

const projections = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

document.body.id = 'root';  // My idea, however, ChatGPT for proper syntax.

// Helper Functions

function isSales() {
  // ChatGPT helped with this.
  let url = window.location.href;
  let fileName = url.substring(url.lastIndexOf('/') + 1);

  if (fileName === 'sales.html') {
    return true;
  } else {
    return false;
  }
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
  createAppend('th', null, null, 'table-main');
  for (let hour in hours) {
    createAppend('th', null, hours[hour], 'table-main');
  }
  createAppend('th', 'th-daily-totals', 'Daily Location Total', 'table-main');
}

let hourByHour = [];
let hourByHourTotal = 0;
// There has to be a better way for this...
for (let hour in hours) {
  hourByHour[hour] = 0;
}

function createTableFooter() {
  createAppend('th', 'table-footer', 'Totals', 'table-main');
  for (let hour in hours) {
    createAppend('td', null, hourByHour[hour], 'table-main');
  }
  createAppend('td', null, hourByHourTotal, 'table-main');
}

Location.prototype.render = function () {
  createAppend('tr', 'table-row-' + this.shopLocation, this.shopLocation, 'table-main');
  for (let hour in hours) {
    createAppend('td', null, this.hourlySales[hour], 'table-row-' + this.shopLocation);
    hourByHour[hour] = this.hourlySales[hour] + hourByHour[hour];
    hourByHourTotal += this.hourlySales[hour];
  }
  createAppend('td', null, this.totalSales, 'table-row-' + this.shopLocation);
}

// Location objects & Helpers

const locationInfo = {
  'Seattle': {
    'name': 'Pat\'s at Pikes Place Market',
    'address1': '1701 Space Center Dr',
    'address2': 'Seattle, Washington',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '867-5309',
  },
  'Tokyo': {
    'name': 'Domo Pat\'s Salmon Cookies',
    'address1': '2554 MrRoboto Way',
    'address2': 'Tokyo, Japan',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '369-2121',
  },
  'Dubai': {
    'name': 'Pat\'s on the Dunes',
    'address1': '1111 Tallest Building Drive',
    'address2': 'Dubai, United Arab Emirates',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '871-3838',
  },
  'Paris': {
    'name': 'Pat\'s Under the Tower',
    'address1': '1 I Fell Way',
    'address2': 'Paris, France',
    'hours': hours[0] + ' to ' + hours[hours.length - 1],
    'contact': '432-7878',
  },
  'Lima': {
    'name': 'Pat\'s at Plaza de Armas',
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
if (isSales()) {
  createTableHeader();
  // Create the objects
  for (let location of locations) {
    location.render();
  }
  createTableFooter();
}

// Index.html stuff
Location.prototype.renderDetails = function () {
  createAppend('article', 'mystores', this.locationInfo.name, 'mystores');
  createAppend('article', null, this.locationInfo.address1, 'mystores');
  createAppend('article', null, this.locationInfo.address2, 'mystores');
  createAppend('article', null, this.locationInfo.hours, 'mystores');
  createAppend('article', null, this.locationInfo.contact, 'mystores');
  createAppend('p', null, null, 'mystores');
}

if (!isSales()) {
  createAppend('article', 'mystores', null, 'root');
  for (let location of locations) {
    location.renderDetails();
  }
}
