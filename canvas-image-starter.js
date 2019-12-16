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

var image = new ImageObject({
  src:'./poppitz.jpg',
  x:150,
  y:150,
  width:window.innerWidth * 0.1,
  dx: 5,
  dy: 5
});

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  image.draw();
  image.update();
}

requestAnimationFrame(animate);

// image.draw();
