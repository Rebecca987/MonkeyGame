var PLAY=1;
var OVER=0
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, groundImage;
var score;
score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup(){
  createCanvas(400,400);
  monkey = createSprite(50,350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.14;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw(){
  background(255);
    
  stroke("black")
  textSize(20);
  fill("black")
  text("SURVIVAL TIME: "+ score, 120,20);  
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX=-7;
  if (ground.x < 300){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -12;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
    if(keyDown("right_arrow"))
    {
      gameState=OVER;
    }
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  food();
  obstacles();
  }
  
  if(gameState===OVER)
  {
    reset();
  }
  drawSprites();
}


function food()
{
  if(frameCount%80===0){
    banana = createSprite(400);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-7;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}

function obstacles(){ 
  if(frameCount%300===0)
  {
    obstacle = createSprite(400,322);             
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-7;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
}

