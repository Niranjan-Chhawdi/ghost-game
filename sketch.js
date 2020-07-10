var PLAY = 1;
var END = 0;
var SERVE = 2;
var gameState = SERVE;

var bird;
var pipes = [];

var gameOver;

var score;

var back;

function preload() {
  back = loadImage("bg.jpg");
  bird
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  bird = new Bird();
  pipes.push(new Pipe());

  score = 0;
}

function draw() {

  background(back,this.background);

  if(gameState === SERVE){
    fill(251,188,5);
    text("Press SPACE to start the game",80,70);
    text("1.  Use space bar to jump.",70,120);
    text("2.  if your ghost touches the pipes",70,140);
    text("then your 20 points will be deducted",80,160);
    textSize(20);
    text("Instruction:-",80,100);
  }

  if(keyCode === 32 || touches.length > 0){
    gameState = PLAY;
  }
  
  
  fill(251,188,5);
  text("Score: "+ score, 300,50);
  
 if(gameState === PLAY){

  

  pipes.velocityX = -(6 + 3*score/100);

  score = score + Math.round(getFrameRate()/60);

  for (var i = pipes.length-1; i >= 0; i--){
    pipes[i].display();
    pipes[i].update();
    
    if(pipes[i].hits(bird)){
      console.log("HIT");
      score = score-10;
    //   bird = loadImage("ghost1.png");
    }
    //else{
    //   bird = loadImage("ghost.png");
    // }
    
    if(pipes[i].offscreen()){
      pipes.splice(i,1);
    }


  }

  bird.update();
  bird.display();

  if ( frameCount % 60 == 0){
    pipes.push(new Pipe());
  }
 }
 
}

function keyPressed(){

  if (keyCode === 32 || touches.length > 0){
    bird.up();
    touches = [] ;
    //console.log("SPACE");
  }
}
