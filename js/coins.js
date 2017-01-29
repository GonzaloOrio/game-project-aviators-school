function Coins() {

}

Coins.prototype.maker = function() {
  var randomPosition = Math.floor(Math.random() * (500 - 100)) + 100;
  $(".gift").css("top",randomPosition+"px");
  $(".gift").css("left","860px");
};

// Coins.prototype.treasure = function() {
//   var randomTime = Math.floor(Math.random() * (3 - 1)) + 1;
//   $(".gift").css("top",randomPosition+"px");
//   $(".gift").css("left","720px");
// };

Coins.prototype.movement = function() {
  if ($(".gift").css("left") < "0") {
    this.maker();
  }else{
    $(".gift").css("left","-=5");
  }
};
