//Create variables here
let dog, happyDog, database, foodStock;
var foodS;
var tInt = 2500;
let feedButton, stockButton;
let fedTime, lastFed;
let foodObj;
let stockR, stock;

function preload()
{
	//load images here
  dog = loadImage("images/dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  imageMode(CENTER);

  createCanvas(1000, 1000);

  foodObj = new Food();

  dogS = createSprite(500, 400, 350, 350);
  dogS.addImage("regular", dog);
  dogS.scale = 0.5;

  foodStock = database.ref('FoodStock');
  foodStock.on('value', readStock);

  fedTime = database.ref('LastFed');
  fedTime.on('value', function(data) {
    lastFed = data.val()
  })

  stockR = database.ref('Food')
  stockR.on('value', function(data) {
    stock = data.val();
  })

  feedButton = createButton('Feed Dog');
  feedButton.position(350,50);
  feedButton.mousePressed(() => {
    a = stock;
    b = foodObj.foodStock;
    
    d = new Date();
    year = d.getFullYear();
    month = d.getMonth(); + 1;
    date = d.getDate();
    hour = (d.getHours() + 1);

    if (hour > 12) {
      tId = 'pm';
      finHour = hour -= 12;
    }
    else {
      tId = 'am';
      finHour = hour;
    }

    minute = d.getMinutes() + 1;
    second = d.getSeconds() + 1;

    finDate = `${date}/${month}/${year}  ${finHour}:${minute}:${second} ${tId}`;

    database.ref('/').update({
      Food: a + 1,
      FoodStock: b - 1,
      LastFed: finDate
    });
  });

  stockButton = createButton('Add Food');
  stockButton.position(520,50);
  stockButton.addClass('stock')
  stockButton.mousePressed(() => {
    b = foodObj.foodStock;

    database.ref('/').update({
      FoodStock : b + 1
    });
  })
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  tInt = randomInteger(55, 70) * 100;
  console.log(foodObj.foodStock)

  textSize(30);
  fill(255);
  
  text(stock, 100, 100);
  text(lastFed, 100, 150);

  drawSprites();
}

function readStock(data) {
  foodObj.foodStock = data.val()
}

function writeStock(x, y=-1) {

  if (x <= 0) {
    x = 0;
  }
  else {
    x += y;
  }

  database.ref('/').update({
    Food : x
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// setInterval(function() {
//   console.log(tInt)
//    f = -1 * randomInteger(1,2)
//    console.log(f);
//    writeStock(foodS, f)
   
// }, tInt)

setInterval(function() {
  f = -1;
  writeStock(stock, f);
}, tInt)

