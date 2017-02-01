function Board(options) {
  this.width = options.width;
  this.height = options.height;
  this.airplane = options.airplane;
}

Board.prototype.canMoveAirplaneLeft = function(airplane){
  return airplane.posX > airplane.width;
};

Board.prototype.canMoveAirplaneRight = function(airplane) {
  return airplane.posX < (this.width-160);
};

Board.prototype.canMoveAirplaneUp = function(airplane) {
  return airplane.posY > airplane.height;
};

Board.prototype.canMoveAirplaneDown = function(airplane) {
  return airplane.posY < (this.height-160);
};

Board.prototype.checkCollision = function(){
  console.log(this.collisionBird());
  if (this.collisionBird()) {
    this.crash = window.setInterval(this.crashCollision.bind(this), 1000);
    // $(".enemy").css("top","+=10"); CAMBIAR BACKGROUND DE GOLPE
  }
};

Board.prototype.crashCollision = function(){
  this.airplane.crash();
  // this.birds.crash();
};

// Board.prototype.crashAviator = function (){
//     $("#airplane").css("top","+=10");
// };


Board.prototype.collisionBird = function () {
  var birdX = parseInt($(".enemy").css("left")),
      birdY = parseInt($(".enemy").css("top")),
      aviatorX = parseInt($(".user").css("left")),
      aviatorY = parseInt($(".user").css("top")),
      birdWidth = parseInt($(".enemy").css("width"))/1.5,
      birdHeight = parseInt($(".enemy").css("height"))/1.5,
      aviatorWidth = parseInt($(".user").css("width"))/1.5,
      aviatorHeight = parseInt($(".user").css("height"))/1.5;
    return !(
        ((aviatorY + aviatorHeight) < (birdY)) ||
        (aviatorY > (birdY + birdHeight)) ||
        ((aviatorX + aviatorWidth) < birdX) ||
        (aviatorX > (birdX + birdWidth))
    );
};

// var birdX = this.birds.posX,
//     birdY = this.birds.posY,
//     aviatorX = parseInt($(".user").css("left")),
//     aviatorY = parseInt($(".user").css("top")),
//     birdWidth = this.birds.width/1.5,
//     birdHeight = this.birds.height/1.5,
//     aviatorWidth = parseInt($(".user").css("width"))/1.5,
//     aviatorHeight = parseInt($(".user").css("height"))/1.5;
//     console.log("birdX:"+birdX);
//     console.log("birdY:"+birdY);
