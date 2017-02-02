function Airplane(options) {
  this.posX = options.posX;
  this.posY = options.posY;
  this.width = options.width;
  this.height = options.height;
}

Airplane.prototype.PosInit = function(){
  $(".user").css("top",this.posY+"px");
  $(".user").css("left",this.posX+"px");
};

Airplane.prototype.moveLeft = function(){
  // $(".user").css("left","-=80");
  $(".user").stop().animate({left:this.posX -=30});
  // this.posX -=100;
};

Airplane.prototype.moveRight = function(){
  $(".user").stop().animate({left:this.posX +=30});
  // this.posX +=100;
};

Airplane.prototype.moveUp = function(){
  $(".user").stop().animate({top:this.posY -=30});
  // this.posY -=100;
};

Airplane.prototype.moveDown = function(){
  $(".user").stop().animate({top:this.posY +=30});
    // this.posY +=100;
};

Airplane.prototype.crashCollision = function(){
  var user = $(".user");
  $(".user").addClass("user-crash");
  var interval = setInterval(function() {
    $(".user").css("top","+=6");
    $(".user").css("left","+=2");
    if (parseInt($(".user").css("top")) >= 480) {
      $(".user").removeClass("user-crash");
      clearInterval(interval);
    }
  }, 50);
};

// Airplane.prototype.reset = function(){
//   this.moveLeft = undefined;
//   this.moveRight = undefined;
//   this.moveUp = undefined;
//   this.moveDown = undefined;
//   this.crashCollision = undefined;
//   this.PosInit = undefined;
// };
