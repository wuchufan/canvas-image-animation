// Cache a reference to the html element
    var canvas = document.getElementById('canvas');

    // Set the drawing surface dimensions to match the canvas
    canvas.width  = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    // Get a reference to the 2d drawing context / api
    var ctx = canvas.getContext('2d');

    // --------------------------------------------------
    // Generic method to draw an image rotated on its
    // midpoint.
    // --------------------------------------------------

    function drawRotatedImage(ctx, image, x, y, width, height, rotation){

      // Cache calculation for half width and height
      var halfWidth  = width  / 2;
      var halfHeight = height / 2;

      // Save canvas context state
      ctx.save();

      // Input transformation: translate to midpoint of image
      ctx.translate(x + halfWidth, y + halfHeight);

      // Input transformation: rotate by desired rotation
      ctx.rotate(rotation);

      // Draw the image
      ctx.drawImage(image, -halfWidth, -halfHeight, width, height);

      // Restore previous context state
      ctx.restore();
    }

    // --------------------------------------------------
    // Wrap drawing operation in a method
    // --------------------------------------------------

    function draw(ctx, image){

      // If the image is not ready, wait and try again in
      // approx 50 milliseconds
      if (!image.complete){
        setTimeout(function(){
          draw(ctx, image);
        }, 50);
        return;
      }

      // Basic image draw
      ctx.drawImage(image, 20, 20, 300, 160);

      // Draw some rotated images
      drawRotatedImage(ctx, image, 420,  20, 300, 160, Math.PI / 4);
      drawRotatedImage(ctx, image,  20, 220, 300, 160, 0);
      drawRotatedImage(ctx, image, 420, 220, 300, 160, -Math.PI / 4);
      drawRotatedImage(ctx, image,  20, 420, 300, 160, Math.PI);
      drawRotatedImage(ctx, image, 420, 420, 300, 160, Math.PI / 2);
    }

    // --------------------------------------------------
    // Create / load a new image object
    // --------------------------------------------------

    // Create a new image object
    var image = new Image();

    // Set the image source and start loading
    image.src = './images.png';

    // Attempt to draw the image
    draw(ctx, image);
