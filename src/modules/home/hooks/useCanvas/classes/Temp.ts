import { CanvasEl, CanvasProps } from "../typings/canvas";

class Temp {
  canvasEl: CanvasEl = {} as CanvasEl;

  constructor({ canvasEl }: CanvasProps) {
    this.canvasEl = canvasEl;
  }

  draw() {
    const { ctx } = this.canvasEl;
    ctx.fillStyle = "#ffe4e6";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    //rectangle
    ctx.strokeRect(10, 10, 100, 100);
    ctx.fillRect(10, 10, 100, 100);
  }
}

export default Temp;
