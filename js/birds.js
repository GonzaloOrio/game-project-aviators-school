function Birds() {

}

Birds.prototype.maker = function() {
  var randomPosition = Math.floor(Math.random() * (500 - 100)) + 100;
  $(".enemy").css("top",randomPosition+"px");
  $(".enemy").css("left","860px");
};

// Birds.prototype.flock = function() {
//   var randomTime = Math.floor(Math.random() * (3 - 1)) + 1;
//   $(".enemy").css("top",randomPosition+"px");
//   $(".enemy").css("left","720px");
// };

Birds.prototype.movement = function() {
  // var moveBird = document.getElementsByClassName('enemy');
  // moveBird.style.left = '-=2';
  // moveBird.style.color = 'red';
  if ($(".enemy").css("left") < "0") {
    this.maker();
  }else{
    $(".enemy").css("left","-=8");
  }
};
