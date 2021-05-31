class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",(data)=>{
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
    car1 = createSprite(100,200);
    car2 = createSprite(100,400);
    cars = [car1, car2]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    
    background("floralwhit")
    title2 = createElement('h3')
    title2.html("You are Playing as the Blue Car")
    title2.position(displayWidth/2 - 100, 50)

    if(allPlayers !== undefined){
      background(ground)
      image(track,0,-displayHeight/2,displayWidth*5,displayHeight*2)
      var index = 0
      var x 
      var y = 0
      for(var plr in allPlayers){
        index ++
        y += 200
        x = displayHeight + allPlayers[plr].distance
        cars[index-1].x = x 
        cars[index-1].y = y
        if (plr === "player" + player.index){
          camera.position.y = displayHeight/2
          camera.position.x = cars[index-1].x 
          cars[index-1].addImage(car1Img)
        }else{
          cars[index-1].addImage(car2Img)
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null && gameState === 1){
      player.distance +=50
      player.update();
    }
    if(player.distance > 5600){
      gameState = 2
    }
    drawSprites();
  }
  gameHide(){
    title2.hide()
    form.hide()
  }
  end(){
    console.log("Game Ended")
    var lastTitle = createElement("h1")
    lastTitle.html("The Game Has Ended")
    lastTitle.position(displayWidth/2-150, displayHeight/2-20)
    background(lastBg)
    var finished = createSprite(displayWidth/2 - 150, 50,50,50)
    finished.addImage(endImg)
  }
}