var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
// c.fillRect(0,20,50,50);
// c.fillRect(200,20,50,50);
// c.fillRect(500,20,50,50);

//line
//
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(540,200);
// c.closePath();
// c.stroke();

//arc
// c.beginPath();
// c.arc(300,300,30,0,Math.PI *2, false);
// c.stroke();


// for (var i = 0;i <3; i++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x,y,30,0,Math.PI *2, false);
//   c.stroke();
// }

window.addEventListener('mousemove',function(event){

});

function Circle(x , y, dx, dy,r ){
  const styleArray = ['red','blue','grey','yellow'];
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = r;
  this.color = styleArray[Math.round((Math.random() * styleArray.length))];
  this.draw = function(){

    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI *2, false);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){
    if (this.x + this.radius> innerWidth || this.x < this.radius){
      this.dx = -this.dx;

    }
    if (this.y + this.radius> innerHeight ||this.y < this.radius){
      this.dy = -this.dy;

    }
    this.x+=this.dx;
    this.y+=this.dy;
    // console.log(this.dx,this.dy,this.y+this.radius);
  }
}
const circleArray = [];
for (var i = 0; i < 100; i++){

  var dx = (Math.random() - 0.5)*5;
  var dy = 4;
  var radius = Math.random() * 30;
  var x = Math.random() * (innerWidth - radius * 2) +radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;

  circleArray.push(new Circle(x,y,dx,dy,radius));
}


function animate(){
  requestAnimationFrame(animate);

  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i < circleArray.length;i++){
    circleArray[i].draw();
    circleArray[i].update();
  }


  // c.beginPath();
  // c.arc(x,y,radius,0,Math.PI *2, false);
  // c.stroke();
  // if (x + radius> innerWidth || x < radius){
  //   dx = -dx;
  //
  // }
  // if (y + radius> innerHeight || y < radius){
  //   dy = -dy;
  //
  // }
  // x+=dx;
  // y+=dy


}
requestAnimationFrame(animate);

console.log(canvas);
