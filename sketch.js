var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player1;
var invisibleGround;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score=0;

var canvas;

var ground;

var restart1;
function preload(){
  player1img= loadImage("player.png");
  obstacle1 = loadImage("obstacle.png");
  obstacle2 = loadImage("obstacle1.png");
  obstacle3 = loadImage("obstacle2.png");
  restart1img = loadImage("restart.png");
 
 
}

function setup() {
  canvas=createCanvas(600,600);
 
  player1 = createSprite(290,290,20,50);
  player1.addImage("player", player1img);
  player1.scale = 0.5;
 player1.x=50;
  ground = createSprite(300,300,600,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
 
  restart1 = createSprite(300,140);
  restart1.addImage(restart1img);
  restart1.visible = false;
 
  invisibleGround = createSprite(290,290,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
 
  score = 0;
}

function draw() {
  background(255)
  text("Score: "+ score, 500,50);
    
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   
 
    if(keyDown("space") && player1.y >= 159) {
      player1.velocityY = -14;
    }
 
    player1.velocityY = player1.velocityY + 0.8
 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    player1.collide(invisibleGround);
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player1)){
      gameState = END;
       
    }
  }
  else if (gameState === END) {
    restart1.visible = true;
    restart1.scale=0.5;        
 
    ground.velocityX = 0;
    player1.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    obstaclesGroup.setLifetimeEach(-1);
   
    if(mousePressedOver(restart1)) {
      reset();
    }
  }
 
 
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(300,250,20,30);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage("ob",obstacle1);
              break;
      case 2: obstacle.addImage("ob",obstacle2);
              break;
      case 3: obstacle.addImage("ob",obstacle3);
              break;
      default: break;
    }
     
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  restart1.visible = false;
 
  obstaclesGroup.destroyEach();
 
  score = 0;
 
}
