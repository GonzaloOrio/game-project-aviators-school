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
  $(".user").stop().animate({left:this.posX -=30},100);
  // this.posX -=100;
};

Airplane.prototype.moveRight = function(){
  $(".user").stop().animate({left:this.posX +=30},100);
  // this.posX +=100;
};

Airplane.prototype.moveUp = function(){
  $(".user").stop().animate({top:this.posY -=30},100);
  // this.posY -=100;
};

Airplane.prototype.moveDown = function(){
  $(".user").stop().animate({top:this.posY +=30},100);
    // this.posY +=100;
};
