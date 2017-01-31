function Game(options) {
  this.board = options.board;
  this.controlKeys();
  this.start();
}

Game.prototype.update = function(){
  this.board.checkElements();
};


Game.prototype.controlKeys = function(){
  that = this;
  window.addEventListener('keydown',function(e){
    switch(e.keyCode){
      case 37://left
        if (that.board.airplane.posX > that.board.airplane.width)
          that.board.airplane.moveLeft();
      break;
      case 38://up
        if (that.board.airplane.posY > that.board.airplane.height)
          that.board.airplane.moveUp();
      break;
      case 39://right
        if (that.board.airplane.posX < (that.board.width-160))
          that.board.airplane.moveRight();
      break;
      case 40://down
        if (that.board.airplane.posY < (that.board.height-160))
          that.board.airplane.moveDown();
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

  }, 1000);

});
