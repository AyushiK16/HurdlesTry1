var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var hurdleMen, hurdleMan1, hurdleMan2;
var trackImage, groundImage;
var runAnimation;


function preload(){
  runAnimation = loadAnimation('images/running1.png', 'images/running2.png');
  trackImage = loadImage('images/pla.jpg');
  groundImage = loadImage('images/ground.png');
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }

  
}
