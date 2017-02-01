function Game(options) {
  this.width = options.width;
  this.height = options.height;
  this.airplane = options.airplane;
  this.birds = options.birds;
  this.coins = options.coins;
  this.controlKeys();
  this.start();
}

Game.prototype.update = function(){
  if(!this.checkCollision()){
    this.checkCollision();}
};

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
  return airplane.posY < (this.height-160);
};


Game.prototype.controlKeys = function(){
  if(!this.checkCollision()){
  that = this;
  window.addEventListener('keydown',function(e){
    switch(e.keyCode){
      case 37://left
        if (that.airplane.posX > 55)
          that.airplane.moveLeft();
      break;
      case 38://up
        if (that.airplane.posY > 55)
          that.airplane.moveUp();
      break;
      case 39://right
        if (that.airplane.posX < (that.width-145))
          that.airplane.moveRight();
      break;
      case 40://down
        if (that.airplane.posY < (that.height-200))
          that.airplane.moveDown();
      break;
      case 80: //pause
        if (that.intervalId || birdsInterval || coinsInterval) {
          that.pause();
        } else {
          that.start();
        }
    }
  });
  }
};

Game.prototype.start = function(){
  this.birds.makeBird();
  this.coins.makeCoin();
  // this.birds.createBirds();
  // this.coins.createCoins();
  if (!this.intervalId){
    this.intervalId = window.setInterval(this.update.bind(this), 200);
  }
  if (!this.birdsInterval){
    this.birdsInterval = window.setInterval(this.birds.randomBirds(), 1500);
  }
  if (!this.coinsInterval){
    this.coinsInterval = window.setInterval(this.coins.randomCoins(), 3000);
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

      // break out of loop if crashed
      if (crashed) return false;
  });
  return crashed;
};

Game.prototype.collisionCoin = function () {
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

      crashed = !(
          ((aviatorY + aviatorHeight) < (coinY)) ||
          (aviatorY > (coinY + coinHeight)) ||
          ((aviatorX + aviatorWidth) < coinX) ||
          (aviatorX > (coinX + coinWidth))
      );

      // break out of loop if crashed
      if (getCoin) return false;
  });
  return getCoin;
};


Game.prototype.checkCollision = function(){
    that = this;
  if (this.collisionBird()) {
    this.pause();
    if (!this.coinsInterval){
      this.intervalCrash = window.setInterval(this.crashCollision.bind(this), 80);
    }
  }else if (this.collisionCoin()) {

  }
};

Game.prototype.crashCollision = function(){
  $(".user").addClass("user-crash");
  if($(".user").css("top")<"480px"){
    $(".user").css("top","+=6");
    $(".user").css("left","+=2");
  }else{
    window.setTimeout(this.reload(),5000);
  }
};

Game.prototype.reload = function(){
  if (this.intervalCrash){
    clearInterval(this.intervalCrash);
    this.intervalCrash = undefined;}
  this.airplane.posX = 20;
  this.airplane.posY = 210;
  this.airplane.width = 120;
  this.airplane.height = 90;
  this.airplane.PosInit();
  $(".user").removeClass("user-crash");
  $(".user").css("top","210px");
  $(".user").css("left","20px");
};

var board = $(".page-game");
// var birds = $(".enemy");
// var coins = $(".gift");
// var player = $(".user");

$('.button-start').on('click',function(e){
  board.empty();
  setTimeout(function () {
    board.append($("<div>").addClass("user"));
    // board.append($("<div>").addClass("user"));

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
