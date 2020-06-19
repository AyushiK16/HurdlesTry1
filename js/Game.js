class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    hurdleMan1 = createSprite(100,200);
    hurdleMan1.addAnimation("running", runAnimation);

    hurdleMan2 = createSprite(100,500);
    hurdleMan2.addAnimation("running", runAnimation);


    hurdleMen = [hurdleMan1, hurdleMan2];
  }

  play(){

    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      //give a background colour in hexadecimal.
      background("black");
      
      //index of the array
      var index = 0;
      image(trackImage, 0, -displayHeight*4, displayWidth, displayHeight*5)
      //x and y position of the cars
      var x;
      var y = 175

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 220;
        //use data form the database to display the cars in y direction
        x = displayHeight - allPlayers[plr].distance;
        //hurdleMen[index-1].x = x;
        //hurdleMen[index-1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(x,y,60,60);
          //cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = hurdleMen[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 4500){
      //when it is ended
      gameState = 2;
    }

    drawSprites();

  }

  end(){
    console.log("GAME OVER");
    game.update(2);
  }

}



