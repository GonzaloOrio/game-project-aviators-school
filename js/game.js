function Game(options) {
  this.width = options.width;
  this.height = options.height;
  this.airplane = options.airplane;
  this.birds = options.birds;
  this.coins = options.coins;
  this.board = $(".page-game");
  this.userLifes = 2;
  this.score = 0;
  this.controlKeys();
  this.start();
}

Game.prototype.canMoveAirplaneLeft = function(airplane){
  return airplane.posX > airplane.width;
};

Game.prototype.canMoveAirplaneRight = function(airplane) {
  return airplane.posX < (this.width-160);
};

Game.prototype.canMoveAirplaneUp = function(airplane) {
  return airplane.posY > airplane.height;
};

Game.prototype.canMoveAirplaneDown = function(airplane) {
  return airplane.posY < (this.height-200);
};

Game.prototype.controlKeys = function(){
  var that = this;
  window.addEventListener('keydown',function(e){
    switch(e.keyCode){
      case 37://left
        if (that.airplane.posX > 55 && that.airplane.canMove())
          that.airplane.moveLeft();
      break;
      case 38://up
        if (that.airplane.posY > 55 && that.airplane.canMove())
          that.airplane.moveUp();
      break;
      case 39://right
        if (that.airplane.posX < (that.width-145) && that.airplane.canMove())
          that.airplane.moveRight();
      break;
      case 40://down
        if (that.airplane.posY < (that.height-200) && that.airplane.canMove())
          that.airplane.moveDown();
      break;
      case 80: //pause
        if (that.intervalId || this.birdsInterval || this.coinsInterval) {
          that.pause();
        } else {
          that.start();
        }
    }
  });
};

Game.prototype.update = function(){
  if(!this.checkCollision()){
    this.checkCollision();}
};

Game.prototype.start = function(){
  this.birds.makeBird();
  this.coins.makeCoin();
  if (!this.intervalId){
    this.intervalId = window.setInterval(this.update.bind(this), 200);
  }
  if (!this.birdsInterval){
    this.birdsInterval = window.setInterval(this.birds.randomBirds().bind(this), 800);
  }
  if (!this.coinsInterval){
    this.coinsInterval = window.setInterval(this.coins.randomCoins().bind(this), 2000);
  }
};

Game.prototype.pause = function(){
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;}
  if (this.birdsInterval){
    clearInterval(this.birdsInterval);
    this.birdsInterval = undefined;}
  if (this.coinsInterval){
    clearInterval(this.coinsInterval);
    this.coinsInterval = undefined;}
};

Game.prototype.collisionBird = function () {
  var that = this;
  var crashed = false;
  $(".enemy").each(function () {
    var enemy = $(this);
    var birdX = parseInt(enemy.css("left")),
        birdY = parseInt(enemy.css("top")),
        aviatorX = parseInt($(".user").css("left")),
        aviatorY = parseInt($(".user").css("top")),
        birdWidth = parseInt(enemy.css("width"))/1.5,
        birdHeight = parseInt(enemy.css("height"))/1.5,
        aviatorWidth = parseInt($(".user").css("width"))/1.5,
        aviatorHeight = parseInt($(".user").css("height"))/1.5;

      crashed = !(
          ((aviatorY + aviatorHeight) < (birdY)) ||
          (aviatorY > (birdY + birdHeight)) ||
          ((aviatorX + aviatorWidth) < birdX) ||
          (aviatorX > (birdX + birdWidth))
      );
      if (crashed){
        enemy.remove();
        that.lifes();
        return false;
      }
  });
  return crashed;
};

Game.prototype.lifes = function(){
  if (this.userLifes > 0) {
    $(".heart-"+this.userLifes).remove();
      --this.userLifes;
  }else if(this.userLifes === 0) {
      this.gameOver();
  }
};

Game.prototype.collisionCoin = function () {
  var that = this;
  var getCoin = false;
  $(".gift").each(function () {
    var gift = $(this);
    var coinX = parseInt(gift.css("left")),
        coinY = parseInt(gift.css("top")),
        aviatorX = parseInt($(".user").css("left")),
        aviatorY = parseInt($(".user").css("top")),
        coinWidth = parseInt(gift.css("width"))/1.5,
        coinHeight = parseInt(gift.css("height"))/1.5,
        aviatorWidth = parseInt($(".user").css("width"))/1.5,
        aviatorHeight = parseInt($(".user").css("height"))/1.5;

    getCoin = !(
        ((aviatorY + aviatorHeight) < (coinY)) ||
        (aviatorY > (coinY + coinHeight)) ||
        ((aviatorX + aviatorWidth) < coinX) ||
        (aviatorX > (coinX + coinWidth))
    );
    if (getCoin) {
      that.getCoins(gift.attr("data-value"));
      gift.remove();
      return false;
    }
  });
  return getCoin;
};

Game.prototype.getCoins = function(value){
  if (value === "1")
    this.score += 100;
  if (value === "2")
    this.score += 250;
  if (value === "3")
    this.score += 500;
  $(".score").text("score "+this.score);
};

Game.prototype.checkCollision = function(){
  that = this;
  if (this.collisionBird()) {
    this.pause();
    this.airplane.crashCollision();
    setTimeout(function(){
      that.reload();
      that.start();
    }, 6000);
  }else if(this.collisionCoin()) {
  }
};

Game.prototype.reload = function(){
  this.airplane.posX = 20;
  this.airplane.posY = 210;
  this.airplane.width = 120;
  this.airplane.height = 90;
  this.airplane.PosInit();
  this.airplane.user.show();
};

Game.prototype.gameOver = function(){
  this.pause();
  this.board.empty();
  $(".infoGame").remove();
  this.board.append($("<div>").addClass("gameOver"));
  $(".gameOver").append($("<h1>").addClass("finalScore").text("score "+" "+this.score));
};

$(document).ready(function(){
  $('.button-start').on('click',function(e){
    var board = $(".page-game");
    $(".page-game").empty();
    setTimeout(function() {
      $(".page-game").append($("<div>").addClass("user"));
      $(".page-game").append($("<div>").addClass("infoGame"));
      $(".infoGame").append($("<h1>").addClass("score").text("score "+ 0));
      $(".infoGame").append($("<div>").addClass("heart-0").prepend('<img src="img/heart.png"/>'));
      $(".infoGame").append($("<div>").addClass("heart-1").prepend('<img src="img/heart.png"/>'));
      $(".infoGame").append($("<div>").addClass("heart-2").prepend('<img src="img/heart.png"/>'));
      var game = new Game({
        width: 900,
        height: 600,
        airplane: new Airplane({
          posX: 20,
          posY: 210,
          width: 120,
          height: 90
        }),
        birds: new Birds(),
        coins: new Coins()
      });
    }, 1000);
  });
});
