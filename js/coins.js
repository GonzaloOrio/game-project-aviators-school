
function Coins(){

}

Coins.prototype.randomPosY = function(){
  return Math.floor(Math.random() * (400 - 100)) + 100;
};

Coins.prototype.randomSpeed = function(){
  return Math.floor(Math.random() * (20 - 10)) + 10;
};

Coins.prototype.generateCoin = function(){
  var point = Math.floor(Math.random() * (3 - 0)) + 0;
  var coinY = this.randomPosY();
  var coin = $("<div/>")
      .addClass("gift point-"+point)
      .attr("data-speed", this.randomSpeed())
      .css("top", coinY+"px");
  return coin;
};

// Coins.prototype.coinValue = function(){
//   return Math.floor(Math.random() * (3 - 0)) + 0;
// };
//
// Coins.prototype.coinsPoints = function(){
//   if (this.coinValue() === 0) {
//     $(".gift").addClass("point-3");
//   }else if(this.coinValue() === 1){
//     $(".gift").addClass("point-2");
//   }else{
//     $(".gift").addClass("point-1");
//   }
// };

Coins.prototype.displayCoin = function(board, coin) {
  board.append(coin);
  var interval = setInterval(function() {
    if (parseInt(coin.css("left")) <= 0) {
      clearInterval(interval);
      coin.remove();
    }
    coin.css(
      "left",
      parseInt(coin.css("left")) - 3 + "px"
    );
  }, coin.attr("data-speed"));
};

Coins.prototype.makeCoin = function() {
  var newCoin = this.generateCoin();
  var objInterval = this.displayCoin(board, newCoin);
};

Coins.prototype.randomCoins = function() {
  var that = this;
  return function() {
    if (Math.floor(Math.random() * (2 - 1)) + 1 === 1) {
      that.makeCoin();
    }
  };
};

// Coins.prototype.createCoins = function(){
//   var coinsInterval = setInterval(this.randomCoins(), 3000);
// };
