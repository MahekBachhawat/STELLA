var space,asteroid,spaceship,button,gameover
var gameState="start"
var edges
var asteroidGroup
var count=0

function preload() {
  spaceImage=loadAnimation("space.gif")
  spaceshipImage=loadImage("spaceship.png")
  asteroidImage=loadImage("asteroid.png")
  buttonImage=loadImage("playbutton.png")
  gameoverImage=loadImage("gameover.png")

}

  

function setup() {
  createCanvas(1800,750);
  
  space=createSprite(900,400,1000,800)
  space.addAnimation("spacepic",spaceImage);
  space.scale=2.2;

  
  edges=createEdgeSprites()
   
  spaceship=createSprite(851,774)
  spaceship.addImage("spaceshippic",spaceshipImage);
  spaceship.scale=0.5;
  spaceship.visible=false;

  button=createSprite(width/2,height/2-100)
  button.addImage("buttonpic",buttonImage)
  button.scale=0.5;


  gameover=createSprite(windowWidth/2+100,windowHeight/2-100)
  gameover.addImage("gameoverpic",gameoverImage)
  gameover.scale=2;
  gameover.visible=false;

  asteroidGroup=new Group()

  restart=createSprite(900,375)
  restart.visible=false;
  
}

function draw() 
{
  background(30);
  
  drawSprites();
  textSize(20)
  fill("white")
  text(mouseX+","+mouseY,mouseX,mouseY)

 if(gameState==="start"){
    

    if(mousePressedOver(button)){
    gameState="play"
    }
 } 
 if(gameState==="play"){
    spaceship.visible=true;
    button.destroy()
    obstacle()
    textSize(35)
    fill("red")
    count=count+(Math.round(getFrameRate()/60))
    text("score= "+count,1393,44)
    
    spaceship.collide(edges)

    //player controls
    if(keyDown(RIGHT_ARROW)){
    spaceship.x=spaceship.x+10
    }

    if(keyDown(LEFT_ARROW)){
      spaceship.x=spaceship.x-10
    }
    if(keyDown(UP_ARROW)){
      spaceship.y=spaceship.y-10
    }
    if(keyDown(DOWN_ARROW)){
      spaceship.y=spaceship.y+10
    }
   //changing gamestate to end
   if(asteroidGroup.isTouching(spaceship)){
    gameState="end"
    gameover.visible=true;
   }

  }
   if(gameState==="end"){
   asteroidGroup.destroyEach()
   spaceship.visible=false;
   textSize(35);
   fill("white")
   text("PRESS SPACEKEY TO RESTART",windowWidth/2-100,windowHeight/2+200)
   
   
   if(keyDown("space")){
   gameState="play"
   spaceship.visible=true;
   gameover.visible=false;
   }

   }
 
}
function obstacle(){
if(frameCount%60===0){
  asteroid=createSprite(100,400)
  asteroid.y=random(30,650)
  asteroid.addImage("asteroidpic",asteroidImage);
  asteroid.scale=0.2
  asteroid.visible=true;
  asteroid.velocityX=15;
  asteroid.lifetime=450;
  asteroidGroup.add(asteroid)

}


}


