var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');
// var image = new Image();
//
// image.src = './favicon.jpg';
//
// image.onload = function(){
//
//
//   c.drawImage(image,0, 0,image.width * 0.5,image.height * 0.5);
// }

function ImageObject(props){

  this.image = new Image();
  this.image.src = props.src;

  this.x = props.x;
  this.y = props.y;
  this.dx = props.dx;
  this.dy = props.dy;
  this.width = props.width;
  this.height = this.width * this.ratio;

  this.draw =() =>{
    // if image is not loaded, give it 50ms and try again
    if (!this.image.complete){
      setTimeout(()=>{
        this.draw();
      }, 50);
      return;
    }

      this.ratio = this.image.height / this.image.width;
      this.width = props.width;
      this.height = this.width * this.ratio;

    c.drawImage(this.image,this.x,this.y,this.width,this.height);
  }

  this.update = ()=>{
    if (this.x + this.width > innerWidth || this.x < 0 ){
      this.dx = -this.dx;

    }
    if (this.y + this.height > innerHeight || this.y < 0){
      this.dy = -this.dy;

    }

    this.x +=this.dx;
    this.y +=this.dy;
  }
}
function Circle(x , y, dx, dy,r ){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = r;
  this.color = 'rgba(190, 225, 239, 0.4)';
  this.draw = function(){

    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI *2, false);
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

  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
const circleArray = [];
for (var i = 0; i < 200; i++){

  var dx = Math.random() *0.2 * (-1)**getRndInteger(-1,1);
  var dy = Math.random() * 0.2 *(-1)**getRndInteger(-1,1);
  var radius = Math.random() * 3;
  var x = Math.random() * (innerWidth - radius * 2) +radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;

  circleArray.push(new Circle(x,y,dx,dy,radius));
}
var image = new ImageObject({
  src:'./poppitz.jpg',
  x:150,
  y:150,
  width:window.innerWidth * 0.1,
  dx: 5,
  dy: 5
});
const imageArray = [];
for (var i = 0; i <5; i++){
  imageArray.push(new ImageObject({
    src:'./poppitz.jpg',
    x:getRndInteger(0,1200),
    y:getRndInteger(0,600),
    width:window.innerWidth * 0.1,
    dx: getRndInteger(-10,10) ,
    dy: getRndInteger(-10,10)
  }));
}


function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for (var i = 0; i < circleArray.length;i++){
    circleArray[i].draw();
    circleArray[i].update();
  }
  for (var i =0; i <imageArray.length; i++){
    imageArray[i].draw();
    imageArray[i].update();
  }

}

requestAnimationFrame(animate);

// image.draw();
