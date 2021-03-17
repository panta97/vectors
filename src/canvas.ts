import { Coords } from "./coords";
import { Vector } from "./vector";

interface CoordOpts {
  canvasId: string;
  width: number;
  height: number;
  step: number;
}

class VectorCanvas {
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private step: number;
  private coords: Coords;
  private vectors: Vector[] = [];
  constructor(opts: CoordOpts) {
    this.canvas = document.getElementById(opts.canvasId) as HTMLCanvasElement;
    this.canvas.width = opts.width;
    this.canvas.height = opts.height;
    this.width = opts.width;
    this.height = opts.height;
    this.step = opts.step;
    this.fixBlur();
    this.coords = new Coords(
      this.canvas.getContext("2d")!,
      this.width,
      this.height,
      this.step
    );
    //
    this.coords.drawCoords();
  }

  private lastVector(): Vector {
    return this.vectors.slice(-1)[0];
  }

  private updateLastVector(v: Vector) {
    this.vectors[this.vectors.length - 1] = v;
  }

  // vector proxy methods
  v([x, y]: [number, number]) {
    this.vectors.push(new Vector(x, y));
    return this;
  }

  mag() {
    console.log("Magnitude: ", this.lastVector().magnitude());
    return this;
  }

  mul(n: number) {
    this.lastVector().multiply(n);
    return this;
  }

  nor() {
    this.lastVector().normalize();
    return this;
  }

  add([x, y]: [number, number]) {
    const newV = new Vector(x, y);
    this.updateLastVector(this.lastVector().add(newV));
    return this;
  }
  sub([x, y]: [number, number]) {
    const newV = new Vector(x, y);
    this.updateLastVector(this.lastVector().sub(newV));
    return this;
  }

  dis([x, y]: [number, number]) {
    const newV = new Vector(x, y);
    console.log("Distance: ", this.lastVector().distance(newV));
    return this;
  }

  dp([x, y]: [number, number]) {
    const newV = new Vector(x, y);
    console.log("Dot product: ", this.lastVector().dotProduct(newV));
    return this;
  }

  mv([x, y]: [number, number]) {
    this.lastVector().move(x, y);
    return this;
  }

  rot(angle: number) {
    this.lastVector().rotate(angle);
    return this;
  }

  crds() {
    const coords = this.lastVector().getCoords();
    return [coords.x, coords.y];
  }

  crdsDesc() {
    console.log("Coords: ", this.lastVector().getCoords());
    return this;
  }

  draw() {
    this.coords.drawVector(this.lastVector());
    return this;
  }

  // sharp canvas
  private fixBlur() {
    const size = this.width;
    const scale = window.devicePixelRatio;
    this.canvas.style.width = size + "px";
    this.canvas.style.height = size + "px";
    this.canvas.width = size * scale;
    this.canvas.height = size * scale;
    this.canvas.getContext("2d")!.scale(scale, scale);
  }
}

export { VectorCanvas, CoordOpts };
