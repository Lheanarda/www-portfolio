import { FONT_FAMILY } from "../../constants";
import { CanvasEl, CanvasProps } from "../../typings/canvas";

export interface AlphaBlockProps {
  alphabet: string;
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor?: string;
  color?: string;
}
class AlphaBlock {
  alphabet = "";

  backgroundColor = "";

  canvasEl = {} as CanvasEl;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  color = "";

  mouse = {
    x: 0,
    y: 0,
    pressed: false,
  };

  constructor(props: CanvasProps<AlphaBlockProps>) {
    this.canvasEl = props.canvasEl;
    this.alphabet = props.alphabet;
    this.backgroundColor = props.backgroundColor ?? "transparent";
    this.width = props.width;
    this.height = props.height;
    this.x = props.x;
    this.y = props.y;
    this.color = props.color ?? "black";
  }

  draw() {
    const { ctx } = this.canvasEl;

    // create rectangle
    ctx.lineWidth = 1;
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.strokeRect(this.x, this.y, this.width, this.height);

    // draw text
    const fontSize = this.width;
    ctx.font = `${fontSize}px ${FONT_FAMILY}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.color;
    ctx.fillText(
      this.alphabet,
      this.x + this.width / 2,
      this.y + this.height / 1.8
    );
  }

  update() {
    this.draw();
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  updateMousePosition(x: number, y: number, pressed: boolean) {
    this.mouse = { x, y, pressed };
  }
}

export default AlphaBlock;
