const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var database;
var position;
var balloon,balloonImg1,balloonImg2,balloonImg3;
var background,backImg;

function preload(){
backImg=loadImage("images/Background.png");
balloonImg1=loadAnimation("images/Hot Air Balloon-1.png");
balloonImg2=loadAnimation("images/Hot Air Balloon-2.png");
balloonImg3=loadAnimation("images/Hot Air Balloon-3.png");

}

function setup() {
  database=firebase.database();
  createCanvas(800,625);
 // createSprite(400, 200, 50, 50);
 balloon=createSprite(250,400);
 balloon.addAnimation("balloonfly",balloonImg1);
 var balloonPosition=database.ref('balloon/positionx,balloon/positiony');
 balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(backImg);  

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
  }
else if(keyDown(RIGHT_ARROW)){
  balloon.x=balloon.x+10;
  }
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("HotAirBalloon",balloonImg2);
  balloon.scale=balloon.scale-0.01;
 // balloon.y=balloon.y-10;
  }
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,10);
  balloon.addAnimation("HotAirBalloon-7",balloonImg3);
  balloon.scale=balloon.scale+0.01;
  //  balloon.y=balloon.y+10;
  }

  fill("Blue");
	textSize(25);
	text("Use Arrow Keys To Move Hot Air Balloon!!", 120, 30);
  drawSprites();
}

function updateHeight(x,y){
database.ref('balloon/position').set({
'x' :balloon.x + x ,
'y' :balloon.y + y ,
})
}

function readHeight(data){
  height=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
console.log("Error in writing to the database");
}