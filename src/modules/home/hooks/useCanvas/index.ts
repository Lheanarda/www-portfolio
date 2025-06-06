import { RefObject, useEffect } from "react";
import AlphaBlock from "./classes/AlphaBlock";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    //settings
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // TODO: MOVE TO ANOTHER CLASS
    const padding = 20;
    const initialX = 10;
    const blockSize = (canvas.width - padding) / 4;

    const alphaBlock = new AlphaBlock({
      alphabet: "A",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX,
      y: canvas.height / 2 - blockSize / 2,
    });

    const alphaBlock2 = new AlphaBlock({
      alphabet: "L",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX + blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    const alphaBlock3 = new AlphaBlock({
      alphabet: "E",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX + 2 * blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    const alphaBlock4 = new AlphaBlock({
      alphabet: "X",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX + 3 * blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    function animate() {
      requestAnimationFrame(animate);
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      alphaBlock.draw();
      alphaBlock2.draw();
      alphaBlock3.draw();
      alphaBlock4.draw();
    }

    animate();
  }, [ref]);
};

export default useCanvas;
