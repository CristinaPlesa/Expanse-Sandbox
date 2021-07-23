$(document).ready(function () {
  const c = document.getElementById("canvas_is_cool");
  const ctx = c.getContext("2d"); // context variable is used to draw on a 2D plane

  const createTriangle = (pos, sidelen) => {
    ctx.beginPath();
    ctx.moveTo(...pos); // go to the left vertex

    // (0, 0) is the top-left corner of the canvas
    // (0, 100) renders 100px down from the top
    // to move back "up" on the screen from (0, 100) you would have to subtract
    ctx.lineTo(pos[0] + sidelen / 2, pos[1] - sidelen * Math.sin(Math.PI/3)); // draw line from left vertex to top vertex
    ctx.lineTo(pos[0] + sidelen, pos[1]); // draw line from top vertex to right vertex
    ctx.lineTo(...pos); // draw line from right vertex back to left vertex
    ctx.closePath();
    ctx.fill(); // fills the most recently closed path: this case being the triangle
  }
  createTriangle([1, 100], 50);
  
  const createSierpinskiTriangle = (pos, sidelen, depth) => {
    const innerTriangleSidelen = sidelen / 2; // side length of inner triangles is half the side length of the outer triangle
    const innerTrianglePositions = [
      pos,
      [ pos[0] + innerTriangleSidelen, pos[1] ],
      [ pos[0] + innerTriangleSidelen / 2, pos[1] - Math.sin(Math.PI/3) * innerTriangleSidelen ]
    ]; // these positions are the same as what was used in the createTriangle function
    if(depth == 0) {
      innerTrianglePositions.forEach((trianglePosition) => {
        createTriangle(trianglePosition, innerTriangleSidelen);
      });
    } else {
      innerTrianglePositions.forEach((trianglePosition) => {
        createSierpinskiTriangle(trianglePosition, innerTriangleSidelen, depth - 1);
      });
    }
  }
  createSierpinskiTriangle([0, 2000], 1000, 6);

  
  const createSquare = (pos, sidelen) => {
    ctx.beginPath();
    ctx.moveTo(...pos);

    ctx.lineTo(pos[0], pos[1] - sidelen);
    ctx.lineTo(pos[0] + sidelen, pos[1] - sidelen);
    ctx.lineTo(pos[0] + sidelen, pos[1]);
    ctx.closePath();
    ctx.fill();
  }
  createSquare([100, 100], 50);

  const createSquareWithMethod = (pos, sidelen, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(pos[0], pos[1], sidelen, sidelen);
  }
  createSquareWithMethod([500, 1000], 100, 'red');

  const createPythagorasTree = (pos, sidelen, depth) => {
    const iteration = 0;
    const newSidelen = sidelen * (Math.sqrt(2) / 2);
    
    if(iteration === depth) {
      createSquareWithMethod(pos, sidelen);
    } else {
      ctx.translate(pos[0], pos[1] - sidelen);
      ctx.rotate(45 * Math.PI / 180);
      ctx.translate(-pos[0], -pos[1]);
      ctx.strokeRect(pos[0], pos[1], newSidelen, newSidelen),
      
      ctx.strokeRect(pos[0] + sidelen, pos[1], newSidelen, newSidelen)
      iteration += 1;
      createPythagorasTree(pos, sidelen, depth)
    }
  }
  createPythagorasTree([500, 1000], 100, 3);

  // }
  // ^for user input of color to work, I would have to stringify their input? and pass it into color parameter?

  // for (let i = 0; i <= 4; i++) {
  //   sidelen = sidelen * (Math.sqrt(2) / 2);
  //   ctx.fillRect(pos[0] * or plus?)
  //   // change it's starting position/ position will be different for new squares
  //   // rotate it/ rotate will be the same value for both new squares
  // }


  // const createPythagorasTree = (pos, sidelen, depth) => {
  //   const smallerSquareSidelen = sidelen / (Math.sqrt(2) / 2);

  //   const leftSquare = [

  //   ]
  // }

  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
  // Code to create Rectangle shapes (can replace my path code in createSquare function) :
  //    rect(x, y, width, height)
  //    Draws a rectangle whose top-left corner is specified by (x, y) with the specified width and  height
  //   fillRect(x, y, width, height)
  //   Draws a filled rectangle.
  //   strokeRect(x, y, width, height)
  //   Draws a rectangular outline.
  //   clearRect(x, y, width, height)
  //   Clears the specified rectangular area, making it fully transparent.


  const downloadCanvasContent = () => {
    const link = document.createElement('a'); // create link element
    link.download = 'Sierpinski Triangle.png'; // set download attribute
    link.href = c.toDataURL(); // set the link's URL to the data URL to be downloaded
    link.click(); // click the element and the download on the user's browser
  }
});