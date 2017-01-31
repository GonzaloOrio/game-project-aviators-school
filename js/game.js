function Game(options) {
  this.board = options.board;
  this.airplane = options.board.airplane;
  this.bird = options.board.birds;
  this.coin = options.board.coins;
  this.intervalId = undefined;

  this.controlKeysHandler = (function(e){
    switch(e.keyCode){
      case 37://left
        if (this.board.canMoveAirplaneLeft(this.airplane))
          this.board.airplane.moveLeft();
        break;
      case 38://up
        if (this.board.canMoveAirplaneUp(this.airplane))
          this.board.airplane.moveUp();
        break;
      case 39://right
        if (this.board.canMoveAirplaneRight(this.airplane))
          this.board.airplane.moveRight();
        break;
      case 40://down
        if (this.board.canMoveAirplaneDown(this.airplane))
          this.board.airplane.moveDown();
        break;
      case 80: //pause
        if (this.intervalId) {
          this.pause();
        } else {
          this.start();
        }
    }
  }).bind(this);

  this.controlKeys();
}

Game.prototype.update = function(){
  this.bird.movement();
  this.coin.movement();
  this.checkCollision();
};

Game.prototype.checkCollision = function() {
  console.log('checking collision');
  setTimeout(function() {
    console.log('removing event');
    window.removeEventListener('keydown', this.controlKeysHandler);
  }.bind(this), 2000);
}

Game.prototype.controlKeys = function(){
  console.log('adding event');
  window.addEventListener('keydown', this.controlKeysHandler);
};

Game.prototype.start = function(){
  if (!this.intervalId){
    this.intervalId = window.setInterval(this.update.bind(this), 60);
    // var randomTime = Math.floor(Math.random() * (5000 - 3000)) + 3000;
    // this.generateBirds = window.setInterval(this.board.birds.maker.bind(this), randomTime);
  }
};

// Game.prototype.reStart = function(){
//   this.board();
//   if (!this.intervalId){
//     this.intervalId = window.setInterval(this.update.bind(this), 60);
//   }else{
//
//   }
// };

// Game.prototype.stop = function(){
//   clearInterval(this.intervalId);
//   this.board.checkCollision();
// };

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
      board: new Board({
        width: 900,
        height: 600,
        airplane: new Airplane({
          posX: 300,
          posY: 30,
          width: 120,
          height: 90
        }),
        birds: new Birds(
          // posX: 860,
          // posY: 0,
          // width: 49,
          // height: 40
        ),
        coins: new Coins()
      })

    });

    game.start();
  }, 1000);

});
