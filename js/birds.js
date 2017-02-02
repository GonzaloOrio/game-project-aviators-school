
function Birds(){

}

Birds.prototype.randomPosY = function() {
  return Math.floor(Math.random() * (450 - 60)) + 60;
};

Birds.prototype.randomSpeed = function() {
  return Math.floor(Math.random() * (10 - 5)) + 5;
};

Birds.prototype.generateBird = function(){
  var birdY = this.randomPosY();
  var bird = $("<div/>")
      .addClass("enemy")
      .attr("data-speed", this.randomSpeed())
      .css("top", birdY+"px");
  return bird;
};

Birds.prototype.displayBird = function(board, bird) {
  board.append(bird);
  this.intervalDisplay = setInterval(function() {
    if (parseInt(bird.css("left")) <= 0) {
      clearInterval(this.intervalDisplay);
      bird.remove();
    }
    bird.css(
      "left",
      parseInt(bird.css("left")) - 2 + "px"
    );
  }, bird.attr("data-speed"));
};

Birds.prototype.makeBird = function() {
  var newBird = this.generateBird();
  var objInterval = this.displayBird(board, newBird);
};

Birds.prototype.randomBirds = function() {
  var that = this;
  return function() {
    if (Math.floor(Math.random() * (2 - 1)) + 1 === 1) {
      that.makeBird();
    }
  };
};
