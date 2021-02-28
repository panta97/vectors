import "./styles/style.scss";

const canvas = document.getElementById("plane") as HTMLCanvasElement;
const width = 500;
const height = 500;
const step = 25;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const scale = window.devicePixelRatio;

// fix blur
(function () {
  const size = 500;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  canvas.width = size * scale;
  canvas.height = size * scale;
  ctx.scale(scale, scale);
})();

function drawLines(longitude: number, step: number, axis: string) {
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

function drawText(longitude: number, step: number, axis: string) {
  for (let i = 0; i < longitude / step; i++) {
    if (axis === "x") {
      ctx.fillText(
        String(i - longitude / 2 / step),
        i * step,
        longitude / 2 + 10
      );
    } else if (axis === "y") {
      ctx.fillText(
        String(-1 * (i - longitude / 2 / step)),
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
