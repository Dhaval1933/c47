var rocket,asteroid,background,blast,lazer,earth,gameOver;
var rocketImg,asteroidImg,backgroundImg,blastImg,lazerImg,earthImg,gameOverImg;
var life=3,score=0;
var play=1,end=0;
var gameState=play;
var lazerGroup,asteroidGroup;
function preload(){
  rocketImg = loadImage("rocket.png")
  asteroidImg = loadImage("asteroid.png")
  backgroundImg = loadImage("background.jpg")
  blastImg = loadImage("blast.png")
  lazerImg = loadImage("lazer.png")
  earthImg = loadImage("earth.png")
  gameOverImg = loadImage("gameOver.png")
}
function setup() {
  
  createCanvas(800,400);
  
  background = createSprite(200,100,200,200);
  background.addImage(backgroundImg)
  background.scale=1.2;

  earth = createSprite(400,550,50,50);
  earth.addImage(earthImg)
  earth.scale=3
  earth.setCollider("rectangle",0,0,400,130)

  rocket = createSprite(400, 350, 50, 50);
  rocket.addImage(rocketImg)
  rocket.scale=0.08;

  gameOver=createSprite(200,200,20,20);
  gameOver.addImage(gameOverImg);

  asteroidGroup = createGroup();
 
  lazerGroup = createGroup();
  if(lazerGroup.collide(earth)){
    handleGameover(lazerGroup)
  }
}  
function draw() { 
  
  if(gameState===play){
      movebg()
      controls()
      if(frameCount%80===0){
      spawnAsteroid()
      }
      gameOver.visible=false;
      if(keyDown("space")){
      shootLazer()
      }
      if(asteroidGroup.collide(lazerGroup)){
      blast=createSprite(lazer.x,lazer.y,50,50)   
      blast.addImage(blastImg)
      blast.scale=0.3;
      blast.life=20
      lazerGroup.destroyEach()
      asteroidGroup.destroyEach()
      if (life > 0) {
        score=score+1;
     }  
    }
      if(asteroidGroup.collide(earth)||asteroidGroup.collide(rocket)){
        life=life-1;
      }
   if(life===0){
     gameState=end;

   }
  }
  else if(gameState===end){
    asteroidGroup.destroyEach();
    lazerGroup.destroyEach();
    background.velocityY=0;
    gameOver.visible=true;
    if(mousePressedOver(gameOver)){
      reset()
    }
    earth.visible=false;
    rocket.visible=false;
  } 
  
    drawSprites();
    text(" score:- "+score,20,20)
    text(" lives:- "+life,20,35)
  }
function controls(){
  if(keyDown(LEFT_ARROW)){
    rocket.x=rocket.x-6;
  }
  if(keyDown(RIGHT_ARROW)){
    rocket.x=rocket.x+6;
  }
 }
function movebg(){
  background.velocityY=1
  if(background.y===240){
    background.y=100;
  }
}
function spawnAsteroid(){
  asteroid = createSprite(random(10,800),10,50,50);
  asteroid.addImage(asteroidImg)
  asteroid.scale=0.08;
  asteroid.velocityY = 3;
  asteroid.lifetime = 400;
  asteroidGroup.add(asteroid)
}
function shootLazer(){
  lazer= createSprite(150, rocket.y, 50,20)
  lazer.x = rocket.x-20;
  lazer.addImage(lazerImg)
  lazer.scale=0.02
  lazer.velocityY = -7
  lazerGroup.add(lazer)
}
function handleAsteroidCollision(asteroidGroup){
  if (life > 0) {
     score=score+1;
  }
    if(lazerGroup.collide(asteroidGroup)){
    blast= createSprite(lazer.x, lazer.y, 50,50);
    image(blastImg)    
    blast.scale=0.3
    blast.life=20
    lazerGroup.destroyEach()
    asteroidGroup.destroyEach()
    }
}
function reset(){
  //background.velocityY=1;
  gameState=play;
  life=3;
  score=0;
  asteroidGroup.destroyEach();
  lazerGroup.destroyEach();
  earth.visible=true;
  rocket.visible=true;
}
