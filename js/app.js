'use strict'

// Global Constants
const hours = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];
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
    this.totalSales += randomSales;
    tmpArray.push(randomSales);
  }
  return tmpArray;
}

Location.prototype.render = function () {
  createAppend('div', this.shopLocation, null, 'root')
  createAppend('h2', null, this.shopLocation, this.shopLocation);
  createAppend('ul', 'ul-main-' + this.shopLocation, null, this.shopLocation);
  for (let hour in hours) {
    createAppend('li', null, hours[hour] + ': ' + this.hourlySales[hour] + ' cookies', 'ul-main-'+ this.shopLocation);    
  }
  createAppend('li', null, 'Total: ' + this.totalSales + ' cookies', 'ul-main-'+ this.shopLocation);
}

// Location objects
const locations = [
  new Location('Seattle', 23, 65, 6.3),
  new Location('Tokyo', 3, 23, 1.2),
  new Location('Dubai', 11, 38, 3.7),
  new Location('Paris', 20, 38, 2.3),
  new Location('Lima', 2, 16, 4.6)
]

// Helper functions

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
  let parentElement = document.getElementById(parentID);
  parentElement.appendChild(newElement);
}

// Create the objects
for (let location of locations) {
  location.render();
}
