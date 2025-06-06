import { FONT_FAMILY } from "../../constants";
import { CanvasEl, CanvasProps } from "../../typings/canvas";
import Particle from "./Particle";

const GAP = 4;
interface Props {
  alphabet: string;
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor?: string;
}
class AlphaParticlesEffect {
  particles: Particle[] = [];

  alphabet = "";

  backgroundColor = "";

  canvasEl = {} as CanvasEl;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  gap = GAP;

  mouse = {
    x: 0,
    y: 0,
  };

  constructor(props: CanvasProps<Props>) {
    this.canvasEl = props.canvasEl;
    this.alphabet = props.alphabet;
    this.backgroundColor = props.backgroundColor ?? "transparent";
    this.width = props.width;
    this.height = props.height;
    this.x = props.x;
    this.y = props.y;
    this.draw();
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
    this.convertToParticles();
  }

  convertToParticles() {
    const { ctx } = this.canvasEl;

    this.particles = [];

    const startX = this.x;
    const startY = this.y;
    const scanWidth = this.width;
    const scanHeight = this.height;

    const imageData = ctx.getImageData(startX, startY, scanWidth, scanHeight);
    const pixels = imageData.data;

    for (let y = 0; y < scanHeight; y += this.gap) {
      for (let x = 0; x < scanWidth; x += this.gap) {
        const index = (y * scanWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red},${green},${blue})`;

          this.particles.push(
            new Particle({
              canvasEl: this.canvasEl,
              x: x + startX, // shift back to global canvas coordinates
              y: y + startY,
              color,
              effect: this,
            })
          );
        }
      }
    }
  }

  update() {
    this.particles.forEach((p) => p.update());
  }

  updateMousePosition(x: number, y: number) {
    this.mouse = { x, y };
  }

  // Experiment
  moveTo(targetX: number, targetY: number) {
    this.x = targetX;
    this.y = targetY;

    // just update x/y and let particles recalculate origin
  }
}

export default AlphaParticlesEffect;
