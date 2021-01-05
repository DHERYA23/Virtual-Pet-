//Create variables here
var dog,dogImg;
var happyDog,database,foodS,foodStock;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(49,138,87)
  
  //add styles here
  if(keyWentDown(UP_ARROW) && foodS>1){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  fill("black");
  text("Food remaining: "+foodS,170,100);
  strokeWeight(4);
  text("NOTE : PRESS THE UP_ARROW TO FEED THE DRAGO MILK",100,20);

  if(keyWentDown(LEFT_ARROW)){
    foodS = 20;
  }
  
}


function readStock(data){
 
  foodS = data.val();
  
}



function writeStock(x){
  if(x<=0) {
    x=0;
  }
  else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}




