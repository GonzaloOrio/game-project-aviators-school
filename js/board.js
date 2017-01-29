function Board(options) {
}


// Board.prototype.collision = function(){
//   var birdX = $(".enemy").css("left");
//   var birdY = $(".enemy").css("top");
//   var aviatorX = $(".user").css("left");
//   var aviatorY = $(".user").css("top");
//   var birdWidth = $(".enemy").css("width");
//   var birdHeight = $(".enemy").css("height");
//   var aviatorWidth = $(".user").css("width");
//   var aviatorHeight = $(".user").css("height");
//   if (birdTop === aviatorTop || birdDown === aviatorDown){
//     alert("collision!!!");
//   }
// };

Board.prototype.checkCollision = function(){
  if (this.collision()===true) {
    alert("collision!!!");
  }
};

Board.prototype.crashAviator = function (){
    $("#airplane").css("top","+=10");
};

Board.prototype.collision = function () {
  var birdX = parseInt($(".enemy").css("left")),
      birdY = parseInt($(".enemy").css("top")),
      aviatorX = parseInt($(".user").css("left")),
      aviatorY = parseInt($(".user").css("top")),
      birdWidth = parseInt($(".enemy").css("width"))/1.5,
      birdHeight = parseInt($(".enemy").css("height"))/1.5,
      aviatorWidth = parseInt($(".user").css("width"))/1.5,
      aviatorHeight = parseInt($(".user").css("height"))/1.5;
    return !(
        ((aviatorY + aviatorHeight) < (birdY)) ||
        (aviatorY > (birdY + birdHeight)) ||
        ((aviatorX + aviatorWidth) < birdX) ||
        (aviatorX > (birdX + birdWidth))
    );
};

Board.prototype.collideAction = function(){

};
