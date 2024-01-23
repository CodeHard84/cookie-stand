'use strict'

// Global Constants
const hours = ["6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm",
  "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm"];

const projections = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];  

document.body.id = 'root';  // My idea, however, ChatGPT for proper syntax.

function Location(shopLocation, minCustomers, maxCustomers, averageSales) {
  // This is the location constructor
  this.shopLocation = shopLocation;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.averageSales = averageSales;
  this.totalSales = 0;

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

// Location objects
const locations = [
  new Location('Seattle', 23, 65, 6.3),
  new Location('Tokyo', 3, 23, 1.2),
  new Location('Dubai', 11, 38, 3.7),
  new Location('Paris', 20, 38, 2.3),
  new Location('Lima', 2, 16, 4.6),
  new Location('Mom\'s Basement', 1, 2, 3.7) // Test
];

// Helper functions

createTableHeader();

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

// Create the objects
for (let location of locations) {
  location.render();
}

createTableFooter();
