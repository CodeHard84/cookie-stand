'use strict'

const seattle = {
  location: 'seattle',
  minCustomers: 23,
  maxCustomers: 65,
  averageSales: 6.3,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const tokyo = {
  location: 'tokyo',
  minCustomers: 3,
  maxCustomers: 24,
  averageSales: 1.2,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const dubai = {
  location: 'dubai',
  minCustomers: 11,
  maxCustomers: 38,
  averageSales: 3.7,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const paris = {
  location: 'paris',
  minCustomers: 20,
  maxCustomers: 38,
  averageSales: 2.3,
  hourlySales: [],

  generateSales: function () {
    this.hourlySales = generateHourlySales(this);
  }
}
const lima = {
  location: 'lima',
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
  let hoursOpen = 13;

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

  const hoursOpen = 13;

  for (let i = 0; i < hoursOpen; i++){
    const li = document.createElement('li');
    li.textContent = shop.hourlySales[i];
    listDiv.appendChild(li);
  }

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
