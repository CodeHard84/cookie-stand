'use strict'

const seattle = {
  location: 'seattle',
  minCustomers: 0,
  maxCustomers: 0,
  customers: 0,
  averageSales: 6.3,
  hourlySales: [],

  generateCustomers: function () {
    this.customers = generateRandomNumberInRange(this.minCustomers, this.maxCustomers);
  },

  generateSales: function () {
    this.hourlySales = generateHourlySales(this.customers, this.averageSales);
  }
}
const tokyo = {
  location: 'tokyo',
  minCustomers: 3,
  maxCustomers: 24,
  customers: 0,
  averageSales: 1.2,
  hourlySales: [],

  generateCustomers: function () {
    this.customers = generateRandomNumberInRange(this.minCustomers, this.maxCustomers);
  },

  generateSales: function () {
    this.hourlySales = generateHourlySales(this.customers, this.averageSales);
  }
}
const dubai = {
  location: 'dubai',
  minCustomers: 11,
  maxCustomers: 38,
  customers: 0,
  averageSales: 3.7,
  hourlySales: [],

  generateCustomers: function () {
    this.customers = generateRandomNumberInRange(this.minCustomers, this.maxCustomers);
  },

  generateSales: function () {
    this.hourlySales = generateHourlySales(this.customers, this.averageSales);
  }
}
const paris = {
  location: 'paris',
  minCustomers: 20,
  maxCustomers: 38,
  customers: 0,
  averageSales: 2.3,
  hourlySales: [],

  generateCustomers: function () {
    this.customers = generateRandomNumberInRange(this.minCustomers, this.maxCustomers);
  },

  generateSales: function () {
    this.hourlySales = generateHourlySales(this.customers, this.averageSales);
  }
}
const lima = {
  location: 'lima',
  minCustomers: 2,
  maxCustomers: 16,
  customers: 0,
  averageSales: 4.6,
  hourlySales: [],

  generateCustomers: function () {
    this.customers = generateRandomNumberInRange(this.minCustomers, this.maxCustomers);
  },

  generateSales: function () {
    this.hourlySales = generateHourlySales(this.customers, this.averageSales);
  }
}

// Random whole number between range
function generateRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function generateHourlySales(){
  return;
 }