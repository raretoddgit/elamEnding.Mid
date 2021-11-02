// clock parameters
var clockRadius;
var handLength = 300;
var angle = 0;
let missAngle = 90;
let makeAngle = 0;
let circAngle = 0;
let shouldTween = false;
let targetTime = 180;

let bPressed = false;

let PA; //posssession arrow

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();
  strokeWeight(5);
  strokeCap(ROUND);

  // Setup
  clockRadius = 1.5 * (windowWidth / 2);
}

let a_start = 0.0;
let a_speed = 0.01;
let a_direction = -1;
let a_tween = 0;

let b_start = 0.05;
let b_speed = 0.01;
let b_direction = 1;
let b_tween = 0;

function draw() {
  background(255);
  angleMode(DEGREES);
  // Note: adds trail of previous direction
  // background(255, 255, 255, 12.5);

  let cx = width / 2;
  let cy = height / 2;

  // Circle Function
  // x - center_x
  // y - center_y
  // offset_pct - size of the step as percentage of circle
  stroke("blue");
//   if (shouldTween && a_direction > 0) {
//     stroke("green");
//   }
  let r_point = circleAt(cx, cy, b_start / 12, 300);
  b_start += b_speed * b_direction;
  line(cx, cy, r_point.x, r_point.y);

  // Add a trail if direction positive (have ball)
  //   if (a_direction > 0) {
  //     let step = -0.001;
  //     for (let i = 0; i < 100; i++) {
  //       r_point = circleAt(cx, cy, b_start / 12 + step * i, 300);
  //       push();
  //       let c = color("red");
  //       c.setAlpha(255 - map(i, 0, 100, 0, 255));
  //       strokeWeight(2);
  //       stroke(c);
  //       line(cx, cy, r_point.x, r_point.y);
  //       pop();
  //     }
  //   }

  stroke("black");
//   if (shouldTween && b_direction > 0) {
//     stroke("green");
//   }
  let b_point = circleAt(cx, cy, a_start / 12, 300);
  a_start += a_speed * a_direction;
  line(cx, cy, b_point.x, b_point.y);

  // Add a trail if direction positive (have ball)
  //   if (b_direction > 0) {
  //     let step = -0.001;
  //     for (let i = 0; i < 100; i++) {
  //       r_point = circleAt(cx, cy, a_start / 12 + step * i, 300);
  //       push();
  //       let c = color("black");
  //       c.setAlpha(255 - map(i, 0, 100, 0, 255));
  //       strokeWeight(2);
  //       stroke(c);
  //       line(cx, cy, r_point.x, r_point.y);
  //       pop();
  //     }
  //   }

  // draw arc
  (() => {
    push();
    translate(width / 2, height / 2);
    rotate(-90);
    //stroke("#5597cf");
    stroke("red");
    noFill();
    arc(0, 0, clockRadius, clockRadius,0, circAngle);
    circAngle += 0.24;
    pop();
  })();

  //clockshot should reset when mousePressed
  if (mousePressed) {
    makeTarget = 0;
    
    
  }
}

function keyReleased() {
  // console.log('key released works');
}

//shotAttempt
function keyTyped() {
  if (key == "b" || key == "B") {
    console.log("key");
    bPressed = true;
  }
}

function keyPressed() {
  myKey = key;
  myKeyCode = keyCode;

  switch (key) {
    case "s":
      shotMake("A");
      break;
    case "d":
      shotMake("B");
      break;
    case "t":
      turnOver();
      break;
    // case "g":
    //   easeToZero();
    //   break;
    // default:
    //   break;
  }
}

function shotMake(hand) {
  switch (hand) {
    case "A":
      // reset start position - A
      a_start = 0;
      break;
    case "B":
      // reset start position - B
      b_start = 0;
      break;
    default:
      break;
  }

  // Store old speeds
  let old_a_speed = a_speed;
  let old_b_speed = b_speed;
  let old_a_direction = a_direction;
  let old_b_direction = b_direction;

  // stop both hands
  a_speed = 0;
  b_speed = 0;

  tweenMe();
  setTimeout(() => {
    // FIXME: Pressing s & d together causes
    // issues.

    // change direction
    // set back old speeds
    a_speed = old_a_speed;
    b_speed = old_b_speed;
    a_direction = old_a_direction * -1;
    b_direction = old_b_direction * -1;
  }, 2000);
}

function turnOver() {
  a_direction *= -1;
  b_direction *= -1;
}

//shotMiss

// function makeShot() {
//   targetTime = 0;
// }

function missShot() {}

function mousePressed() {
  a_direction *= -1;
  b_direction *= -1;
}

//control speed
//logic

//team with possession turns clockwise, defenders turn counter
//shot attempt: swift easing motion toward 12
//make: go toward 12
//miss: hard down to 6

// Low-Level
function circleAt(x, y, offset_pct = 0, size = 10) {
  let radians = 2 * Math.PI;

  // Move starting point 90-degrees counter clockwise
  let rdn = -(radians / 4);
  // Now move to the desired offset percentage
  rdn += radians * offset_pct;

  let result_point = {
    x: x + size * Math.cos(rdn),
    y: y + size * Math.sin(rdn),
  };

  // Debug by Drawing a point
  //   circle(x, y, 10);
  //   circle(result_point.x, result_point.y, 10);
  // Return
  return result_point;
}

function tweenMe() {
  shouldTween = true;
  setTimeout(() => {
    shouldTween = false;
  }, 2000);
}
