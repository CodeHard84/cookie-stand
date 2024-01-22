'use strict'

// Global Constants
const hours = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];

function Location(name, minCustomers, maxCustomers, averageSales) {
  // This is the location constructor
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.averageSales = averageSales;

  // Prototype functions
  hourlySales = this.generateHourlySales(); // Do all the things

}

Location.prototype.generateHourlySales() {}

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
