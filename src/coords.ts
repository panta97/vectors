import { Vector } from "./vector";

class Coords {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private width: number,
    private height: number,
    private step: number
  ) {}

  drawCoords() {
    //   draw center point
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, 1, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();

    // x axis
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 2);
    this.ctx.lineTo(this.width, this.height / 2);
    this.ctx.stroke();

    // y axis
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();

    this.ctx.strokeStyle = "gray";
    this.ctx.lineWidth = 0.2;
    // x lines
    this.drawLines(this.width, this.step, "x");
    // y lines
    this.drawLines(this.height, this.step, "y");

    // x text
    this.drawText(this.width, this.step, "x");
    // y text
    this.drawText(this.height, this.step, "y");

    // reset props
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
  }

  drawVector(v: Vector) {
    const {
      x,
      y,
      xo,
      yo,
    }: { x: number; y: number; xo?: number; yo?: number } = v.getCoords();

    if (xo && yo) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.width / 2 + xo! * this.step,
        this.height / 2 + yo! * this.step * -1
      );
      this.ctx.lineTo(
        this.width / 2 + this.step * x,
        this.height / 2 + this.step * y * -1
      );
      this.ctx.stroke();
    } else {
      // start at (0, 0)
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height / 2);
      this.ctx.lineTo(
        this.width / 2 + this.step * x,
        this.height / 2 + this.step * y * -1
      );
      this.ctx.stroke();
    }

    // draw arrow
    if (!xo && !yo) {
      // draw arrow head
      // bp = begin point
      const bpx = this.width / 2 + this.step * x;
      const bpy = this.height / 2 + this.step * y * -1;
      let corrAngle = 0;

      if (x > 0) {
        corrAngle = Math.atan(y / x);
      } else if (x <= 0 && y >= 0) {
        corrAngle = Math.atan(x / y) * -1 + Math.PI / 2;
      } else if (x < 0 && y < 0) {
        corrAngle = Math.atan(y / x) + Math.PI;
      } else if (x <= 0 && y <= 0) {
        // just for negative line why?
        corrAngle = Math.atan(y / x);
      }

      // const corrAngle = Math;
      const aperture = 0.13;
      const headLineLen = 0.3;

      this.ctx.beginPath();
      this.ctx.moveTo(bpx, bpy);
      this.ctx.lineTo(
        bpx +
          Math.cos(Math.PI * (1 - aperture) + corrAngle) *
            this.step *
            headLineLen,
        bpy +
          Math.sin(-Math.PI * (1 - aperture) - corrAngle) *
            this.step *
            headLineLen
      );
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(bpx, bpy);
      this.ctx.lineTo(
        bpx +
          Math.cos(Math.PI * (1 + aperture) + corrAngle) *
            this.step *
            headLineLen,
        bpy +
          Math.sin(-Math.PI * (1 + aperture) - corrAngle) *
            this.step *
            headLineLen
      );
      this.ctx.stroke();
    }
  }

  private drawLines(longitude: number, step: number, axis: string) {
    for (let i = 0; i < longitude / step; i++) {
      this.ctx.beginPath();
      if (axis === "x") {
        this.ctx.moveTo(i * step, 0);
        this.ctx.lineTo(i * step, longitude);
      } else if (axis === "y") {
        this.ctx.moveTo(0, i * step);
        this.ctx.lineTo(longitude, i * step);
      }
      this.ctx.stroke();
    }
  }

  private drawText(longitude: number, step: number, axis: string) {
    for (let i = 0; i < longitude / step; i++) {
      if (axis === "x") {
        this.ctx.fillText(
          String(i - longitude / 2 / step),
          i * step,
          longitude / 2 + 10
        );
      } else if (axis === "y") {
        this.ctx.fillText(
          String(-1 * (i - longitude / 2 / step)),
          longitude / 2 - 12,
          i * step
        );
      }
    }
  }
}

export { Coords };
