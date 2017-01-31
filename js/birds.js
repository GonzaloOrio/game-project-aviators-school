function Birds() {
  this.posX = 860;
  this.posY = 0;
  this.width = 49;
  this.height = 40;
  this.velocity = 0;
}

Birds.prototype.maker = function() {
  this.posY = Math.floor(Math.random() * (500 - 100)) + 100;
  this.velocity = Math.floor(Math.random() * (8 - 4)) + 4;
  $(".enemy").css("top",this.posY+"px");
  $(".enemy").css("left",this.posX+"px");
};

// Birds.prototype.flock = function() {
//   var randomTime = Math.floor(Math.random() * (5000 - 3000)) + 3000;
//   this.maker();
//   that = this;
//   function newBirds() {
//     console.log("pasa por aqui");
//     debugger;
//       var bird1 = new Birds();
//       that.maker();
//
//   }
//   setInterval(newBirds(),randomTime);
// };

Birds.prototype.movement = function() {
  if ($(".enemy").css("left") < "0") {
    this.maker();
  }else{
    $(".enemy").css("left","-="+this.velocity);
  }
};

Birds.prototype.crash = function(){
  $(".user").addClass("user-crash");
  if($(".enemy").css("top")<"500px"){
    $(".enemy").css("top","+=6");
    $(".enemy").css("left","+=2");
  }
};
