var monkey, monkey_running, monkey1;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var score;
var ground;
var gameState, PLAY, END;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}


function setup() {
  createCanvas(600, 400);


  //monkey
  monkey = createSprite(70, 345, 100, 100);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  //ground
  ground = createSprite(200, 401, 800, 20);
  //invisibleGround
  invisibleGround = createSprite(200, 400, 400, 10);
  invisibleGround.visible = false;
  //group
  foodGroup = new Group();
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  //state
  gameState = "PLAY";
  
  //score
  score = 50;
}


function draw() {
  background("lightblue");

  if (gameState === "PLAY") {
    fill("black");
    textSize(20);
    text("SURVIVING TIME: " + score, 30, 50);

    //spacekey
    if (keyDown("space") && monkey.y >= 330) {
      monkey.velocityY = -15;
      obstacleGroup.velocityX = -5;
    }

    if (frameCount % 60 === 0) {
      score -= 1;
    }
    
    if (frameCount % 1000 === 0) {
      obstacleGroup.velocityX += 2;
    }
    
    //gravity
    monkey.velocityY = monkey.velocityY + 0.88;
    monkey.collide(invisibleGround);
    //spawning
    spawnobstacle();
    spawnfood();

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score += 1
    }

    if (monkey.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      score -= 25;
    }

    if (score === -1 || score < -1) {
      gameState = "END";
    }
  } else {if (gameState === "END"){

    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    obstacleGroup.velocityX = 0;
    bananaGroup.velocityX = 0;
    fill("red");
    textSize(40);
    textFont("Freestyle Script");
    text("Game Over", 230, 200);
    textSize(32);
    text("Press (ctrl)(R) ", 215, 240);
    noFill;
  }
 }
  drawSprites();
}


function spawnobstacle() {
  //obstacles
  if (frameCount % 70 === 0) {
    obstacle = createSprite(600, 366, 10, 10);
    obstacle.velocityX = -10;
    obstacle.lifetime = 200;
    obstacle.scale = 0.12;
    obstacleGroup.add(obstacle);
    obstacle.addImage(obstacleImage);
  }
}

function spawnfood() {

  //food banana
  if (frameCount % 70 === 0) {
    banana = createSprite(600, 200, 40, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    //assigning lifetime to the variable
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}