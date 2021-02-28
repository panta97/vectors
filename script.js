const canvas = document.getElementById("plane");
const width = 500;
const height = 500;
const step = 25;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");

const scale = window.devicePixelRatio;

// fix blur
(function () {
  const size = 500;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  canvas.width = size * scale;
  canvas.height = size * scale;
  canvas.getContext("2d").scale(scale, scale);
})();

function drawLines(longitude, step, axis) {
  for (let i = 0; i < longitude / step; i++) {
    ctx.beginPath();
    if (axis === "x") {
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, longitude);
    } else if (axis === "y") {
      ctx.moveTo(0, i * step);
      ctx.lineTo(longitude, i * step);
    }
    ctx.stroke();
  }
}

function drawText(longitude, step, axis) {
  for (let i = 0; i < longitude / step; i++) {
    if (axis === "x") {
      ctx.fillText(i - longitude / 2 / step, i * step, longitude / 2 + 10);
    } else if (axis === "y") {
      ctx.fillText(
        -1 * (i - longitude / 2 / step),
        longitude / 2 - 12,
        i * step
      );
    }
  }
}

function drawCoords() {
  //   draw center point
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 1, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  // x axis
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  // y axis
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();

  ctx.strokeStyle = "gray";
  ctx.lineWidth = 0.2;
  // x lines
  drawLines(width, step, "x");
  // y lines
  drawLines(height, step, "y");

  // x text
  drawText(width, step, "x");
  // y text
  drawText(width, step, "y");

  // reset props
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
}

drawCoords();

// @ts-check

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    // start at (0, 0)
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2 + step * this.x, height / 2 + step * this.y * -1);
    ctx.stroke();

    // draw arrow head
    // bp =begin point
    const bpx = width / 2 + step * this.x;
    const bpy = height / 2 + step * this.y * -1;
    let corrAngle = 0;

    if (this.x > 0) {
      corrAngle = Math.atan(this.y / this.x);
    } else if (this.x <= 0 && this.y >= 0) {
      corrAngle = Math.atan(this.x / this.y) * -1 + Math.PI / 2;
    } else if (this.x < 0 && this.y < 0) {
      corrAngle = Math.atan(this.y / this.x) + Math.PI;
    } else if (this.x <= 0 && this.y <= 0) {
      // just for negative line why?
      corrAngle = Math.atan(this.y / this.x);
    }

    // const corrAngle = Math;
    const aperture = 0.13;
    const headLineLen = 0.3;

    ctx.beginPath();
    ctx.moveTo(bpx, bpy);
    ctx.lineTo(
      bpx + Math.cos(Math.PI * (1 - aperture) + corrAngle) * step * headLineLen,
      bpy + Math.sin(-Math.PI * (1 - aperture) - corrAngle) * step * headLineLen
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(bpx, bpy);
    ctx.lineTo(
      bpx + Math.cos(Math.PI * (1 + aperture) + corrAngle) * step * headLineLen,
      bpy + Math.sin(-Math.PI * (1 + aperture) - corrAngle) * step * headLineLen
    );
    ctx.stroke();
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  multiply(n) {
    this.x *= n;
    this.y *= n;
  }

  // unit vector
  normalize() {
    const magnitude = 1 / this.magnitude();
    this.x *= magnitude;
    this.y *= magnitude;
  }

  static add(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  static sub(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  static distance(vector1, vector2) {
    const diffVector = Vector.sub(vector1, vector2);
    return diffVector.magnitude();
  }

  static dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }
}
