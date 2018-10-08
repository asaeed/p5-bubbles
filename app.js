/*********************************
 *  Balls can be thrown about and 
 *  softly bounce off one another 
 **********************************/
/*
 * Translated to p5js by professorcook.org from
 * www.khanacademy.org/profile/peterwcollingridge/projects
 * All code is owned by its respective author and
 * is made available under the MIT license.
*/
// Physical variables to play with
var acceleration = 0.04; // Force of throw
var drag = 0.9; // Air resistance
var friction = 0.85; // Wall bounciness
var gravity = 0; // Force due to gravity

var numBalls = 150; // Number of balls

var balls = [];
var selectedBall = false;
var i, j, ball;

function setup() {
  createCanvas(800, 800);
  for (var b = 0; b < numBalls; b++) {
    var r = 5 + Math.round(random() * 20);
    var x = r + Math.round(random() * (400 - 2 * r));
    var y = r + Math.round(random() * (400 - 2 * r));
    var c = color(40, 60, 160, 200);
    balls.push(new Ball(x, y, r, c));
  }
  noStroke();
}



var draw = function() {
  // Clear everything
  background(250, 247, 240);

  // Draw balls
  for (i = 0; i < numBalls; i++) {
    ball = balls[i];
    fill(ball.c);
    ellipse(ball.x, ball.y, ball.r * 2, ball.r * 2);
  }

  // Calculate acceleration
  for (i = 0; i < numBalls; i++) {
    if (balls[i] !== selectedBall) {
      balls[i].dy += gravity;
    }
    for (j = i; j < numBalls; j++) {
      balls[i].collide(balls[j]);
    }
  }

  // Work out if any ball is dragged
  if (mouseIsPressed) {
    if (!selectedBall) {
      for (i = 0; i < numBalls; i++) {
        if (balls[i].selected()) {
          selectedBall = balls[i];
          break;
        }
      }
    } else {
      // Throw ball
      selectedBall.dx += (mouseX - selectedBall.x) * acceleration;
      selectedBall.dy += (mouseY - selectedBall.y) * acceleration;
    }
  } else {
    selectedBall = false;
  }

  // Move balls
  for (i = 0; i < numBalls; i++) {
    ball = balls[i];
    ball.move();
    ball.bounce();
  }
};

// Let go when mouse leaves canvas
var mouseOut = function() {
  mouseIsPressed = false;
};
