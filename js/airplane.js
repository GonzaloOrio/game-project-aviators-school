function Airplane(options) {
  this.user = $(".user");
  this.posX = options.posX;
  this.posY = options.posY;
  this.width = options.width;
  this.height = options.height;
  this.crashed = false;
}

Airplane.prototype.PosInit = function(){
  this.crashed = false;
  this.user.css("top",this.posY+"px");
  this.user.css("left",this.posX+"px");
};

Airplane.prototype.moveLeft = function(){
  this.user.stop().animate({left:this.posX -=30},10);
};

Airplane.prototype.moveRight = function(){
  this.user.stop().animate({left:this.posX +=30},10);
};

Airplane.prototype.moveUp = function(){
  this.user.stop().animate({top:this.posY -=30},10);
};

Airplane.prototype.moveDown = function(){
  this.user.stop().animate({top:this.posY +=30},10);
};

Airplane.prototype.canMove = function(){
  return !this.crashed;
};

Airplane.prototype.crashCollision = function(){
  var that = this;
  this.crashed = true;
  this.user.addClass("user-crash");
  var interval = setInterval(function() {
    that.user.css("top","+=6");
    that.user.css("left","+=2");
    if (parseInt($(".user").css("top")) >= 480) {
      that.user.hide();
      that.user.removeClass("user-crash");
      clearInterval(interval);
    }
  }, 50);
};
