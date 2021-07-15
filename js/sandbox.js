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

})