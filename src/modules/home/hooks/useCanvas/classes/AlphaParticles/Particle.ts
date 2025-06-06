import { CanvasEl, CanvasProps } from "../../typings/canvas";
import AlphaParticleEffect from "./AlphaParticlesEffect";

interface Props {
  effect: AlphaParticleEffect;
  x: number;
  y: number;
  color: string;
}

class Particle {
  canvasEl = {} as CanvasEl;

  effect = {} as AlphaParticleEffect;

  x = 0;

  y = 0;

  originX = 0;

  originY = 0;

  color = "";

  size = 0;

  dx = 0;

  dy = 0;

  vx = 0;

  vy = 0;

  friction = 0;

  ease = 0;

  angle = 0;

  distance = 0;

  force = 0;

  maxOffsetX = 15;

  maxOffsetY = 15;

  lastMouseX = 0;

  lastMouseY = 0;

  relativeX = 0;

  relativeY = 0;

  constructor({ effect, x, y, color, canvasEl }: CanvasProps<Props>) {
    this.canvasEl = canvasEl;
    this.effect = effect;

    this.color = color;
    this.x = x;
    this.y = y;
    this.size = effect.gap;

    this.friction = Math.random() * 0.5 + 0.15;
    this.ease = Math.random() * 0.1 + 0.05;

    this.lastMouseX = effect.mouse.x;
    this.lastMouseY = effect.mouse.y;

    this.relativeX = x - effect.x;
    this.relativeY = y - effect.y;
    this.originX = this.effect.x + this.relativeX;
    this.originY = this.effect.y + this.relativeY;
  }

  draw() {
    const { ctx } = this.canvasEl;

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    ctx.strokeStyle = "#ffffff22";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }

  update() {
    const { x: mouseX, y: mouseY } = this.effect.mouse;

    // Recalculate origin dynamically
    this.originX = this.effect.x + this.relativeX;
    this.originY = this.effect.y + this.relativeY;

    const deltaX = mouseX - this.lastMouseX;
    const deltaY = mouseY - this.lastMouseY;

    const moveX = Math.max(
      -this.maxOffsetX,
      Math.min(this.maxOffsetX, deltaX * 0.5)
    );
    const moveY = Math.max(
      -this.maxOffsetY,
      Math.min(this.maxOffsetY, deltaY * 0.5)
    );

    this.vx += (this.originX + moveX - this.x) * this.ease;
    this.vy += (this.originY + moveY - this.y) * this.ease;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;

    this.draw();
  }
}

export default Particle;
