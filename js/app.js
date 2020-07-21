'use strict';
var sectionpro = document.getElementById('all_products');
var AllProducts = [];
var sumOfClicks = 0;
var rightindex;
var leftindex;
var midindex;
var prevousProducts = [];
var productName = [];
var clicks = [];
var views=[];
// console.log(AllProducts);
function Productes(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  AllProducts.push(this);
  productName.push(this.name);
  // console.log(AllProducts);
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
  // console.log(number);
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
  // console.log('prevouse products  ' + prevousProducts);
  for (var i = 0; i < prevousProducts.length; i++) {
    if (leftindex === prevousProducts[i]) {
      // console.log('befor regenerat the left index ' + leftindex);
      var newnum0 = randomNumber();
      leftindex = newnum0;
      prevousProducts[0] = leftindex;
      // console.log('after regenerat the left index ' + leftindex);
    }
  }
  for (var x = 0; x < prevousProducts.length; x++) {
    if (midindex === prevousProducts[x]) {
      // console.log('befor regenerat the mid index ' + midindex);
      var newnum1 = randomNumber();
      midindex = newnum1;
      prevousProducts[1] = midindex;
      // console.log('after regenerat the mid index ' + midindex);
    }
  }
  for (var y = 0; y < prevousProducts.length; y++) {
    if (rightindex === prevousProducts[y]) {
      // console.log('befor regenerat the right index ' + rightindex);
      var newnum2 = randomNumber();
      rightindex = newnum2;
      prevousProducts[2] = rightindex;
      // console.log('after regenerat the right index ' + rightindex);
    }
    while (leftindex === midindex || leftindex === rightindex) {
      leftindex = randomNumber();
    }
    while (rightindex === leftindex || rightindex === midindex) {
      rightindex = randomNumber();
    }
  }
  prevousProducts[0] = leftindex;
  prevousProducts[1] = rightindex;
  prevousProducts[2] = midindex;
  // console.log('new products ' + prevousProducts);
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
    shearMyData();
    finalMassege();
    chartgenerator();
    saveOurData();
    sectionpro.removeEventListener('click', clicksNumber);
  }
}
function saveOurData(){
  // console.log('AllProducts array before  ' +AllProducts);
  var srtingProducts=JSON.stringify(AllProducts);
  // console.log('AllProducts array after stringify ' +srtingProducts);
  localStorage.setItem('Product',srtingProducts);
  // console.log(localStorage);

}
savingNewObject();
function savingNewObject(){
  var preProducts=JSON.parse(localStorage.getItem('Product'));
  console.log(preProducts);
  newClicks(preProducts);
}
function newClicks(preProducts){
  for (var k=0;k<AllProducts.length;k++){
    AllProducts[k].clicks=preProducts[k].clicks;
    // console.table(preProducts[k]);
    AllProducts[k].views=preProducts[k].views;
  }
}
function finalMassege() {
  var list = document.getElementById('customerChoise');
  for (var i = 0; i < AllProducts.length; i++) {
    var listData = document.createElement('li');
    listData.classList.add('pointer');
    listData.textContent = AllProducts[i].name + ' had ' + AllProducts[i].clicks + ' votes and was shown ' + AllProducts[i].views;
    list.appendChild(listData);
  }
}
function shearMyData() {
  for (let index = 0; index < AllProducts.length; index++) {
    clicks.push(AllProducts[index].clicks);
    views.push(AllProducts[index].views);

  }
}
function chartgenerator() {
  var ctx = document.getElementById('myChart1').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [
        {
          label: '# of Votes',
          data: clicks,
          backgroundColor: 'rgb(102, 195, 255)',
          borderColor: 'orange',
          borderWidth: 1
        },
        {
          label: '# of Views',
          data: views,
          backgroundColor: 'rgb(128, 128, 128)',
          borderColor: 'orange',
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
