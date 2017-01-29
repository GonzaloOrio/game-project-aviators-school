function Game(options) {
  this.airplane = options.airplane;
  this.birds = options.birds;
  this.coins = options.coins;
  this.board = options.board;

  this.controlKeys();
  this.birds.maker();
  this.coins.maker();
  this.start();


}

Game.prototype.update = function(){
  this.birds.movement();
  this.coins.movement();
  this.board.checkCollision();
};

Game.prototype.controlKeys = function(){
  that = this;
  window.addEventListener('keydown',function(e){
    switch(e.keyCode){
      case 37://left
        that.airplane.moveLeft();
      break;
      case 38://up
        that.airplane.moveUp();
      break;
      case 39://right
        that.airplane.moveRight();
      break;
      case 40://down
        that.airplane.moveDown();
      break;
      case 80: //pause
        if (that.intervalId) {
          that.pause();
        } else {
          that.start();
        }
    }
  });
};

Game.prototype.start = function(){
  if (!this.intervalId){
    this.intervalId = window.setInterval(this.update.bind(this), 60);
  }
};

Game.prototype.pause = function(){
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

$('.button-start').on('click',function(e){
  $(".page-game").empty();
  setTimeout(function () {
    $(".page-game").append(
      "<div id='airplane' class='user'></div>"+
      "<div id='bird' class='enemy'></div>"+
      "<div id='coin' class='gift'></div>"
    );
    var game = new Game({
      // rows: 50,
      // columns: 50,
      airplane: new Airplane(),
      birds: new Birds(),
      coins: new Coins(),
      board: new Board({
      })

    });
  }, 1000);

});
