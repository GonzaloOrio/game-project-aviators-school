
function randomPosY() {
  return Math.floor(Math.random() * (80 - 20)) + 20;
}

function randomSpeed() {
  return Math.floor(Math.random() * (20 - 10)) + 10;
}

function generateBird() {
  var birdY = randomPosY();
  var bird = $("<div/>")
      .addClass("enemy")
      .attr("data-speed", randomSpeed())
      .css("top", birdY+"%");
  return bird;
}

function displayBird(board, bird) {
  board.append(bird);
  var interval = setInterval(function() {
    if (parseInt(bird.css("left")) <= 0) {
      clearInterval(interval);
      bird.remove();
    }
    bird.css(
      "left",
      parseInt(bird.css("left")) - 2 + "px"
    );
  }, bird.attr("data-speed"));
}

var board = $(".page-game");
var birdsInterval = setInterval(randomBirds(makeBird), 1500);
makeBird();


function makeBird() {
  var newBird = generateBird();
  var objInterval = displayBird(board, newBird);
}

function randomBirds(createBirds) {
  return function() {
    if (Math.floor(Math.random() * (2 - 1)) + 1 === 1) {
      createBirds();
    }
  };
}
