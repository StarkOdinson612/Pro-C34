//Create variables here
let dog, happyDog, database, foodStock;
var foodS;
var tInt = 2500;

function preload()
{
	//load images here
  dog = loadImage("images/dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dogS = createSprite(250, 250, 250, 250);
  dogS.addImage("regular", dog);
  dogS.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
}


function draw() {  
  background(46, 139, 87);
  tInt = randomInteger(55, 70) * 100;
  console.log(foodS)

  textSize(15);
  fill(255);
  
  text(foodS, 100, 100);

  if (keyWentDown("UP_ARROW")) {
    writeStock(foodS);
    dogS.addImage("happy", happyDog)
  }

  drawSprites();
}

function readStock(data) {
  foodS = data.val()
}

function writeStock(x, y=1) {

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

setInterval(function() {
  console.log(tInt)
   f = -1 * randomInteger(1,2)
   console.log(f);
   writeStock(foodS, f)
   
}, tInt)

