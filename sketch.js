var ground,groundimg,invisibleground;
var player,playerimg,playerdead;
var backgroundimg;
var obstacle,obstaclesGroup,powerGroup;
var Ghost,pipe,flowerPipe,mush,Jr;
var gameOver,gameOverImg,restart,restartImg;
var starimg,powerimg;
var gameState=1;
var PLAY=1;
var END=0;
var score=0;
var lifes=3;

localStorage["Highscore"]=0

function preload(){
groundimg = loadImage("images/ground.png");
playerimg = loadAnimation("walk1.png","walk2.png","walk3.png");
playerdead = loadAnimation("images/dead.png");
backgroundimg = loadImage("images/day.jpg");
Ghost = loadImage("images/Ghosts (2).png");
pipe = loadImage("images/pipe.png");
flowerPipe = loadImage("images/flowerPipe.png");
mush = loadImage("images/mushroom.png");
Jr = loadImage("images/Br.png");
gameOverImg = loadImage("images/gameOverText.png");
restartImg = loadImage("images/restart.png");
starimg = loadImage("images/star.png");
powerimg = loadImage("images/power1.png");

}

function setup() {
  createCanvas(1400,700);
 /* ground=createSprite(700,650,1400,10);
  ground.addImage(groundimg);
  ground.velocityX=-3;
  ground.x=ground.width/2;*/

  ground = createSprite(700,350,1400,700);
  ground.addImage(backgroundimg);
  ground.velocityX=-3;

  invisibleground=createSprite(700,660,1400,10);
  invisibleground.visible=false;

  player=createSprite(50,600,20,10);
  player.addAnimation("mario",playerimg);
  player.addAnimation("dead",playerdead);
  player.setCollider("circle",0,0,30);
//  player.debug=true;

  gameOver = createSprite(700,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(700,400);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup=new Group();
  powerGroup=new Group();

  score=0;
  }

function draw() {
    background("black");
    
  
    
    //Playstate starts
    if(gameState===1)
    {

          if(ground.x<500)
          {
            ground.x=700;
          }

          if((keyDown("Space")||keyDown(UP_ARROW))&& player.y>=597){
            player.velocityY = -15;
          }

          player.velocityY=player.velocityY+1;
          spawnObstacles();
          spawnPowers();
          score = score + Math.round(getFrameRate()/60);

          for(var i=0; i<obstaclesGroup.length;i++)
          {

            if(player.isTouching(obstaclesGroup.get(i)))
             {
             lifes=lifes-1;
             score=score-100;
             obstaclesGroup.get(i).destroy();
             }
        }

          for(var j=0; j<powerGroup.length;j++)
          {
        
               if(player.isTouching(powerGroup.get(j)))
              {
                score=score+50;
                lifes=lifes+1;
                powerGroup.get(j).destroy();
              }
          }

          if(lifes===0)
          {
            gameState=0;
          }


  }
  else if(gameState===0)
  {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    player.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    powerGroup.setVelocityXEach(0);
    powerGroup.setLifetimeEach(-1);


    player.changeAnimation("dead",playerdead);
    player.scale=0.35;
    
    if(mousePressedOver(restart)) 
    {
      reset();
    }

    function reset(){
      gameState = 1;
      gameOver.visible = false;
      restart.visible = false;
      lifes=3;
      
      obstaclesGroup.destroyEach();

      player.changeAnimation("mario",playerimg);
      player.scale=1;
            
      if(localStorage["HighestScore"]<score){
        localStorage["HighestScore"] = score;
      }
      console.log(localStorage["HighestScore"]);
      
      score = 0;
      
    }
  }
    player.collide(invisibleground);
   // console.log(player.y);
    drawSprites();
    text("Score: "+ score, 1200,100);
    text("Lifes:"+ lifes, 200,100);
}

function spawnObstacles()
{
  if(frameCount%120 === 0)
  {
   obstacle=createSprite(1400,620,10,10);
   obstacle.velocityX=-5;

   var rand=Math.round(random(1,5));

   obstacle.setCollider("circle",0,0,20);
  // obstacle.debug=true;

   switch(rand)
   {
    case 1:obstacle.addImage(Ghost);
    obstacle.scale=0.2;
    break
    case 2:obstacle.addImage(pipe);
    obstacle.scale=1;
    break
    case 3:obstacle.addImage(flowerPipe);
    obstacle.scale=0.7;
    break
    case 4:obstacle.addImage(mush);
    obstacle.scale=0.5;
    break
    case 5:obstacle.addImage(Jr);
    obstacle.scale=0.25;
    break
default:break;
   }

   obstacle.lifetime=700;
   obstaclesGroup.add(obstacle);
  }
}

function spawnPowers()
{
  if(frameCount%1000=== 0)
  {
   power=createSprite(1400,520,10,10);
   power.scale=0.2;
   power.velocityX=-5;
   powerGroup.add(power);

   var rand=Math.round(random(1,2))

   switch(rand)
   {
     case 1:power.addImage(starimg);
     break;

     case 2:power.addImage(powerimg);
     break;

     default:break;
   }
   power.lifetime=700;
  }

}

  // var rand=Math.round(random(1,5));

  // obstacle.setCollider("circle",0,0,20);