'use strict'

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

const shops = ['seattle', 'tokyo', 'dubai', 'paris', 'lima'];

 // Simulate purchases per hour
 function generateHourlySales(shop){
  let tempSales = [];
  let hoursOpen = 14;

  for (let i = 0; i < hoursOpen; i++) {
    tempSales[i] = Math.floor(Math.random() * (shop.maxCustomers - shop.minCustomers + 1) + shop.minCustomers) * Math.floor(shop.averageSales);
  }
  return tempSales;
 }

 const mainBodyElement = document.getElementById('mainBody')

 function renderShop(shop) {

  shop.generateSales();

  const listDiv = document.createElement('div');
  mainBodyElement.appendChild(listDiv);
  
  const listHeader = document.createElement('p');
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
