import { FONT_FAMILY } from "../constants";
import { CanvasEl, CanvasProps } from "../typings/canvas";

interface Props {
  alphabet: string;
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor?: string;
}
class AlphaBlock {
  alphabet = "";

  backgroundColor = "";

  canvasEl = {} as CanvasEl;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  constructor(props: CanvasProps<Props>) {
    this.canvasEl = props.canvasEl;
    this.alphabet = props.alphabet;
    this.backgroundColor = props.backgroundColor ?? "transparent";
    this.width = props.width;
    this.height = props.height;
    this.x = props.x;
    this.y = props.y;
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
    ctx.fillStyle = "black";
    ctx.fillText(
      this.alphabet,
      this.x + this.width / 2,
      this.y + this.height / 1.8
    );
  }
}

export default AlphaBlock;
