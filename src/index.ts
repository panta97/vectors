import { CoordOpts, VectorCanvas } from "./canvas";
import "./styles/style.scss";

const options: CoordOpts = {
  canvasId: "plane",
  width: 500,
  height: 500,
  step: 25,
};

const vc = new VectorCanvas(options);

type xy = [number, number];

const v1: xy = [8, 1];
const v2: xy = [4, 4];

vc.v(v1).draw();
vc.v(v2).draw();
vc.v(v1).sub(v2).nor().mv(v2).draw();
