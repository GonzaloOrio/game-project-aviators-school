function Board(options) {
  this.width = options.width;
  this.height = options.height;
  this.airplane = options.airplane;
  this.birds = options.birds;
  this.coins = options.coins;

  this.birds.maker();
  this.coins.maker();
}

Board.prototype.checkElements = function(){
  this.renderBirds();
  this.renderCoins();
  this.checkCollision();
};

Board.prototype.renderBirds = function(){
  this.birds.movement();
};

Board.prototype.renderCoins = function(){
  this.coins.movement();
};


// Board.prototype.collision = function(){
//   var birdX = $(".enemy").css("left");
//   var birdY = $(".enemy").css("top");
//   var aviatorX = $(".user").css("left");
//   var aviatorY = $(".user").css("top");
//   var birdWidth = $(".enemy").css("width");
//   var birdHeight = $(".enemy").css("height");
//   var aviatorWidth = $(".user").css("width");
//   var aviatorHeight = $(".user").css("height");
//   if (birdTop === aviatorTop || birdDown === aviatorDown){
//     alert("collision!!!");
//   }
// };

Board.prototype.checkCollision = function(){
  if (this.collision()) {
    this.crash = window.setInterval(this.crashCollision.bind(this), 1000);
    // $(".enemy").css("top","+=10"); CAMBIAR BACKGROUND DE GOLPE
  }
};

Board.prototype.crashCollision = function(){
  this.airplane.crash();
  this.birds.crash();
};

// Board.prototype.crashAviator = function (){
//     $("#airplane").css("top","+=10");
// };


Board.prototype.collision = function () {
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
