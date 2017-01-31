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
  $(".user").stop().animate({left:this.posX -=80},100);
  // this.posX -=100;
};

Airplane.prototype.moveRight = function(){
  $(".user").stop().animate({left:this.posX +=80},100);
  // this.posX +=100;
};

Airplane.prototype.moveUp = function(){
  $(".user").stop().animate({top:this.posY -=80},100);
  // this.posY -=100;
};

Airplane.prototype.moveDown = function(){
  $(".user").stop().animate({top:this.posY +=80},100);
    // this.posY +=100;
};

Airplane.prototype.crash = function(){
  $(".user").addClass("user-crash");
  if($(".user").css("top")<"500px"){
    $(".user").css("top","+=6");
    $(".user").css("left","+=2");
  }
};

//
// Snake.prototype.grow = function(){
//   if (this.previousTail){
//     this.body.push(this.previousTail);
//     this.previousTail = undefined;
//   }
// };
//
// Snake.prototype.hasEatenFood = function(foodPosition){
//   return this.body[0].row === foodPosition.row &&
//           this.body[0].column === foodPosition.column;
// };
//
// Snake.prototype.hasEatenItself = function(){
//   return this.body.some(function (element, index, array) {
//     return (element.row === array[0].row &&
//             element.column === array[0].column && index !== 0);
//   });
// };
//
// Snake.prototype.collidesWith = function(position){
//   return this.body.some(function (element){
//     return element.row === position.row &&
//            element.column === position.column;
//   });
// };
