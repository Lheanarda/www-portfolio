import { CanvasEl, CanvasProps } from "../typings/canvas";
import AlphaBlock from "./Alphabet/AlphaBlock";
import AlphaL from "./Alphabet/AlphaL";
import AlphaParticlesEffect from "./Alphabet/AlphaParticles/AlphaParticlesEffect";

const PAGE_PADDING = 20;
const INITIAL_X = 10;
const WORDS_LENGTH = 4;

class NameEffect {
  canvasEl = {} as CanvasEl;

  alphaA = {} as AlphaParticlesEffect;

  alphaL = {} as AlphaL;

  alphaE = {} as AlphaBlock;

  alphaX = {} as AlphaParticlesEffect;

  constructor(props: CanvasProps) {
    this.canvasEl = props.canvasEl;
    const { canvas, ctx } = this.canvasEl;
    const blockSize = (canvas.width - PAGE_PADDING) / WORDS_LENGTH;

    this.alphaA = new AlphaParticlesEffect({
      alphabet: "A",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: INITIAL_X,
      y: canvas.height / 2 - blockSize / 2,
    });

    this.alphaL = new AlphaL({
      x: INITIAL_X + blockSize,
      y: canvas.height / 2 - blockSize / 2,
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      alphabet: "L",
    });

    this.alphaE = new AlphaBlock({
      alphabet: "E",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: INITIAL_X + 2 * blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    this.alphaX = new AlphaParticlesEffect({
      alphabet: "X",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: INITIAL_X + 3 * blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });
  }

  update() {
    this.alphaA.update();
    this.alphaL.update();
    this.alphaE.update();
    this.alphaX.update();
  }
}

export default NameEffect;
