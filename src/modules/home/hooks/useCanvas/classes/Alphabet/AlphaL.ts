import { CanvasProps } from "../../typings/canvas";
import AlphaBlock, { AlphaBlockProps } from "./AlphaBlock";

interface Thumb {
  x: number;
  y: number;
  radius: number;
}
class AlphaL extends AlphaBlock {
  thumb = {} as Thumb;

  constructor(props: CanvasProps<AlphaBlockProps>) {
    super(props);
    this.thumb = {
      x: this.x + this.width / 2.8,
      y: this.y + this.height / 3.8,
      radius: this.width / 30,
    };
  }

  drawThumb() {
    const { ctx } = this.canvasEl;
    ctx.beginPath();
    ctx.arc(this.thumb.x, this.thumb.y, this.thumb.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  isCursorPointer() {
    const { x: mouseX, y: mouseY } = this.mouse;
    const dx = mouseX - this.thumb.x;
    const dy = mouseY - this.thumb.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= this.thumb.radius;
  }

  update() {
    super.update();
    this.drawThumb();
  }
}

export default AlphaL;
