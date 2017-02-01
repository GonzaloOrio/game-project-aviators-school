function randomPosY() {
  return Math.floor(Math.random() * (80 - 20)) + 20;
}

function randomSpeed() {
  return Math.floor(Math.random() * (20 - 10)) + 10;
}

function randomValue() {
  return Math.floor(Math.random() * (3 - 0)) + 0;
}

function generateCoin() {
  var coinY = randomPosY();
  var coin = $("<div/>")
      .addClass("gift")
      .attr("data-speed", randomSpeed())
      .css("top", coinY+"%");
      // switch (randomValue()) {
      //   case 0:
      //   $("<div/>").addClass("gift").attr("data-speed", randomSpeed()).css(top:coinY+"%",background-image:"url(../"+coin-1.png");
      //                                                                   .css('background-image', 'url(' + imageUrl + ')');
      //     break;
      //   case 1:
      //
      //     break;
      //   case 2:
      //
      //     break;
      //
      //
      //   }
  return coin;
}

function displayCoin(board, coin) {
  board.append(coin);
  var interval = setInterval(function() {
    if (parseInt(coin.css("left")) <= 0) {
      clearInterval(interval);
      coin.remove();
    }
    coin.css(
      "left",
      parseInt(coin.css("left")) - 2 + "px"
    );
  }, coin.attr("data-speed"));
}

var coinsInterval = setInterval(randomCoins(makeCoin), 3000);
makeCoin();


function makeCoin() {
  var newCoin = generateCoin();
  var objInterval = displayCoin(board, newCoin);
}

function randomCoins(createCoins) {
  return function() {
    if (Math.floor(Math.random() * (2 - 1)) + 1 === 1) {
      createCoins();
    }
  };
}
