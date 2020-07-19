'use strict';
var sectionpro = document.getElementById('all_products');
var AllProducts = [];
var sumOfClicks = 0;
var rightindex;
var leftindex;
var midindex;
// console.log(AllProducts);
function Productes(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  AllProducts.push(this);
}
new Productes('bag', 'images/bag.jpg');
new Productes('banana', 'images/banana.jpg');
new Productes('bathroom', 'images/bathroom.jpg');
new Productes('boots', 'images/boots.jpg');
new Productes('breakfast', 'images/breakfast.jpg');
new Productes('bubblegum', 'images/bubblegum.jpg');
new Productes('chair', 'images/chair.jpg');
new Productes('cthulhu', 'images/cthulhu.jpg');
new Productes('dog-duck', 'images/dog-duck.jpg');
new Productes('dragon', 'images/dragon.jpg');
new Productes('pen', 'images/pen.jpg');
new Productes('pet-sweep', 'images/pet-sweep.jpg');
new Productes('scissors', 'images/scissors.jpg');
new Productes('shark', 'images/shark.jpg');
new Productes('sweep', 'images/sweep.png');
new Productes('tauntaun', 'images/tauntaun.jpg');
new Productes('unicorn', 'images/unicorn.jpg');
new Productes('usb', 'images/usb.gif');
new Productes('water-can', 'images/water-can.jpg');
new Productes('wine-glass', 'images/wine-glass.jpg');

function randomNumber() {
  var number = Math.floor(Math.random() * AllProducts.length);
  console.log(number);
  return number;
}
randomProduct();
function randomProduct() {
  var leftPro = document.getElementById('left-product');
  var midPro = document.getElementById('mid-product');
  var rightPro = document.getElementById('right-product');
  leftindex = randomNumber();
  midindex = randomNumber();
  rightindex = randomNumber();
  while (leftindex === midindex || leftindex === rightindex) {
    leftindex = randomNumber();
  }
  while (rightindex === leftindex || rightindex === midindex) {
    rightindex = randomNumber();
  }
  var leftPath = AllProducts[leftindex].path;
  var midPath = AllProducts[midindex].path;
  var rightPath = AllProducts[rightindex].path;
  AllProducts[leftindex].views += 1;
  AllProducts[midindex].views += 1;
  AllProducts[rightindex].views += 1;
  leftPro.setAttribute('src', leftPath);
  midPro.setAttribute('src', midPath);
  rightPro.setAttribute('src', rightPath);
}
sectionpro.addEventListener('click', clicksNumber);
function clicksNumber() {
  if (sumOfClicks < 25) {
    var clickedProduct = event.target;
    var clickedProductId = clickedProduct.id;
    if (clickedProductId === 'left-product' || clickedProductId === 'mid-product' || clickedProductId === 'right-product') {
      sumOfClicks += 1;
    }
    if (clickedProductId === 'left-product') {
      AllProducts[leftindex].clicks += 1;
    }
    if (clickedProductId === 'mid-product') {
      AllProducts[midindex].clicks += 1;
    }
    if (clickedProductId === 'right-product') {
      AllProducts[rightindex].clicks += 1;
    }
    randomProduct();
  }
  else {
    finalMassege();
    sectionpro.removeEventListener('click', clicksNumber);
  }
}
function finalMassege() {
  var list = document.getElementById('customerChoise');
  for (var i = 0; i < AllProducts.length; i++) {
    var listData = document.createElement('li');
    listData.classList.add('pointer');
    listData.textContent = AllProducts[i].name +' had ' + AllProducts[i].clicks + ' votes and was shown '+AllProducts[i].views;
    list.appendChild(listData);
  }
}
