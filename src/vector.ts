import { Coords } from "./coords";

class Vector {
  constructor(
    private x: number,
    private y: number,
    // origin coords
    private xo?: number,
    private yo?: number
  ) {}

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

  add(vector2: Vector) {
    return new Vector(this.x + vector2.x, this.y + vector2.y);
  }

  sub(vector2: Vector) {
    return new Vector(this.x - vector2.x, this.y - vector2.y);
  }

  distance(vector2: Vector) {
    const diffVector = this.sub(vector2);
    return diffVector.magnitude();
  }

  dotProduct(vector2: Vector) {
    return this.x * vector2.x + this.y * vector2.y;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
    if (!this.xo && !this.yo) {
      this.xo = 0;
      this.yo = 0;
    }
    this.xo! += x;
    this.yo! += y;
  }

  rotate(angle: number) {
    const tempX = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const tempY = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = tempX;
    this.y = tempY;
  }

  getCoords() {
    return {
      x: this.x,
      y: this.y,
      xo: this.xo,
      yo: this.yo,
    };
  }
}

class VectorFactory {
  constructor(private coords: Coords) {}

  v(x: number, y: number) {
    return new Vector(x, y);
  }
}

export { VectorFactory, Vector };
