
function Coins(){
  this.coin = $(".gift");
  this.board = $(".page-game");
}

Coins.prototype.randomPosY = function(){
  return Math.floor(Math.random() * (400 - 100)) + 100;
};

Coins.prototype.randomSpeed = function(){
  return Math.floor(Math.random() * (20 - 10)) + 10;
};

Coins.prototype.generateCoin = function(){
  var point = Math.floor(Math.random() * (4 - 1)) + 1;
  var coinY = this.randomPosY();
  var coin = $("<div/>")
      .addClass("gift point-"+point)
      .attr("data-speed", this.randomSpeed())
      .attr("data-value", point)
      .css("top", coinY+"px");
  return coin;
};

Coins.prototype.displayCoin = function(board, coin) {
  board.append(coin);
  this.intervalDisplay = setInterval(function() {
    if (parseInt(coin.css("left")) <= 0) {
      clearInterval(this.intervalDisplay);
      coin.remove();
    }
    coin.css("left", parseInt(coin.css("left")) - 3 + "px");
  }, coin.attr("data-speed"));
};

Coins.prototype.makeCoin = function() {
  var newCoin = this.generateCoin();
  var objInterval = this.displayCoin(this.board, newCoin);
};

Coins.prototype.randomCoins = function() {
  var that = this;
  return function() {
      that.makeCoin();
  };
};
