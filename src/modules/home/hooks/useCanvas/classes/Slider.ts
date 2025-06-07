import { CanvasEl, CanvasProps, MouseState } from "../typings/canvas";

interface Props {
  startX: number;
  startY: number;
  maxOffsetX: number;
  maxOffsetY: number;
  color?: string;
  thumbRadius?: number;
}
class Slider {
  startX = 0;

  startY = 0;

  maxOffsetX = 0;

  maxOffsetY = 0;

  canvasEl = {} as CanvasEl;

  color = "";

  thumbX = 0;

  thumbY = 0;

  thumbRadius = 0;

  mouse = {
    x: 0,
    y: 0,
    pressed: false,
  };

  constructor(props: CanvasProps<Props>) {
    this.canvasEl = props.canvasEl;
    this.startX = props.startX;
    this.startY = props.startY;
    this.thumbX = props.startX;
    this.thumbY = props.startY;
    this.maxOffsetX = props.maxOffsetX;
    this.maxOffsetY = props.maxOffsetY;
    this.color = props.color ?? "black";
    this.thumbRadius = props.thumbRadius ?? 20;
  }

  isCursorPointer() {
    const { x: mouseX, y: mouseY } = this.mouse;
    const dx = mouseX - this.thumbX;
    const dy = mouseY - this.thumbY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= this.thumbRadius;
  }

  updateMousePosition(x: number, y: number, pressed: boolean) {
    this.mouse = { x, y, pressed };
  }

  drawThumb() {
    const { ctx } = this.canvasEl;
    ctx.beginPath();
    ctx.arc(this.thumbX, this.thumbY, this.thumbRadius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  drawSliderPath() {
    const { ctx } = this.canvasEl;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.lineTo(this.maxOffsetX, this.maxOffsetY);
    ctx.stroke();
  }

  draw() {
    this.drawSliderPath();
    this.drawThumb();
  }

  update() {
    if (this.mouse.pressed) {
      const isInsideRangeOfY =
        this.mouse.y >= this.startY && this.mouse.y <= this.maxOffsetY;
      const isInsideRangeOfX =
        this.mouse.x >= this.startX && this.mouse.x <= this.maxOffsetX;
      if (isInsideRangeOfY) {
        const targetY = Math.max(
          this.startY,
          Math.min(this.mouse.y, this.maxOffsetY)
        );
        this.thumbY += (targetY - this.thumbY) * 0.2;
      }

      if (isInsideRangeOfX) {
        const targetX = Math.max(
          this.startX,
          Math.min(this.mouse.x, this.maxOffsetX)
        );
        this.thumbX += (targetX - this.thumbY) * 0.2;
      }
    }
    this.draw();
  }
}

export default Slider;
