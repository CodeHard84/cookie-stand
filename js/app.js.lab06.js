'use strict'

// Global Constants
const hours = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm"];

// Constructor/Object Shape
Location	Min / Cust	Max / Cust	Avg Cookie / Sale
Seattle	23	65	6.3
Tokyo	3	24	1.2
Dubai	11	38	3.7
Paris	20	38	2.3
Lima	2	16	4.6




'use strict'
const shops = ['seattle', 'tokyo', 'dubai', 'paris', 'lima'];

const seattle = {
  location: 'Seattle',
  minCustomers: 23,
  maxCustomers: 65,
  averageSales: 6.3,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const tokyo = {
  location: 'Tokyo',
  minCustomers: 3,
  maxCustomers: 24,
  averageSales: 1.2,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const dubai = {
  location: 'Dubai',
  minCustomers: 11,
  maxCustomers: 38,
  averageSales: 3.7,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const paris = {
  location: 'Paris',
  minCustomers: 20,
  maxCustomers: 38,
  averageSales: 2.3,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const lima = {
  location: 'Lima',
  minCustomers: 2,
  maxCustomers: 16,
  averageSales: 4.6,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}

 // Simulate purchases per hour
 function generateHourlySales(shop){
  let tempSales = [];
  let hoursOpen = 14;

  for (let i = 0; i < hoursOpen; i++) {
    tempSales[i] = Math.floor(Math.random() * (shop.maxCustomers - shop.minCustomers + 1) + shop.minCustomers) * Math.floor(shop.averageSales);
  }
  return tempSales;
 }

 const mainBodyElement = document.getElementById('mainBody');

 function renderShop(shop) {

  shop.generateSales();

  const listDiv = document.createElement('div');
  mainBodyElement.appendChild(listDiv);
  
  const listHeader = document.createElement('h2');
  listHeader.textContent = shop.location;
  listDiv.appendChild(listHeader);

  const uList = document.createElement('ul');
  listDiv.appendChild(uList);

  const hoursOpen = 14;
  let totalCookies = 0;
  let hour = 6;
  let timeIndicator = 'am: ';

  for (let i = 0; i < hoursOpen; i++){
    totalCookies += shop.hourlySales[i];
    let li = document.createElement('li');

    if (hour === 12) {
      timeIndicator = 'pm: ';
      li.textContent = '12' + timeIndicator + shop.hourlySales[i];
      hour = 0;
    } else {
      li.textContent = hour + timeIndicator + shop.hourlySales[i];
    }
    uList.appendChild(li);
    hour++;
  }
  let li = document.createElement('li');
  li.textContent = 'Total: ' + totalCookies + ' cookies';
  uList.appendChild(li);
 }

renderShop(seattle);
renderShop(tokyo);
renderShop(dubai);
renderShop(paris);
renderShop(lima);

// This doesn't work as expected. Assuming it is because it is passing a string and not an object.
// function loopShops() {
//   for (let i = 0; i < shops.length; i++) {
//     let name = shops[i];
//     console.log(name);
//     renderShop(name);
//   }
// }

// loopShops();

// Don't forget to ask about the above and how to view the html of the rendered document. View source doesn't show the HTML JS changed. So I am not 100% sure if the above is nested
// correctly.
