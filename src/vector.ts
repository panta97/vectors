class Vector {
  constructor(
    private x: number,
    private y: number,
    // origin coords
    private xo?: number,
    private yo?: number
  ) {}

  draw(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    step: number
  ) {
    if (this.xo && this.yo) {
      ctx.beginPath();
      ctx.moveTo(
        width / 2 + this.xo! * step,
        height / 2 + this.yo! * step * -1
      );
      ctx.lineTo(width / 2 + step * this.x, height / 2 + step * this.y * -1);
      ctx.stroke();
    } else {
      // start at (0, 0)
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.lineTo(width / 2 + step * this.x, height / 2 + step * this.y * -1);
      ctx.stroke();
    }

    if (!this.xo && !this.yo) {
      // draw arrow head
      // bp = begin point
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
        bpx +
          Math.cos(Math.PI * (1 - aperture) + corrAngle) * step * headLineLen,
        bpy +
          Math.sin(-Math.PI * (1 - aperture) - corrAngle) * step * headLineLen
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bpx, bpy);
      ctx.lineTo(
        bpx +
          Math.cos(Math.PI * (1 + aperture) + corrAngle) * step * headLineLen,
        bpy +
          Math.sin(-Math.PI * (1 + aperture) - corrAngle) * step * headLineLen
      );
      ctx.stroke();
    }
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  multiply(n: number) {
    this.x *= n;
    this.y *= n;
  }

  // unit vector
  normalize() {
    const magnitude = 1 / this.magnitude();
    this.x *= magnitude;
    this.y *= magnitude;
  }

  static add(vector1: Vector, vector2: Vector) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  static sub(vector1: Vector, vector2: Vector) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  static distance(vector1: Vector, vector2: Vector) {
    const diffVector = Vector.sub(vector1, vector2);
    return diffVector.magnitude();
  }

  static dotProduct(vector1: Vector, vector2: Vector) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }
}

class VectorFactory {
  private vectors: Vector[] = [];
  constructor(
    private ctx: CanvasRenderingContext2D,
    private width: number,
    private height: number,
    private step: number
  ) {}

  newVector(x: number, y: number) {
    this.vectors.push(new Vector(x, y));
  }

  newVectorOrigin(xo: number, yo: number, x: number, y: number) {
    this.vectors.push(new Vector(x, y, xo, yo));
  }

  drawAll() {
    this.vectors.forEach((v) =>
      v.draw(this.ctx, this.width, this.height, this.step)
    );
  }
}

export { VectorFactory };
