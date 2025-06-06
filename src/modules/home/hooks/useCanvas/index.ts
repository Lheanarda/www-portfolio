import { RefObject, useEffect } from "react";
import AlphaBlock from "./classes/AlphaBlock";
import AlphaParticlesEffect from "./classes/AlphaParticles/AlphaParticlesEffect";

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

    const alphaParticleA = new AlphaParticlesEffect({
      alphabet: "A",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX,
      y: canvas.height / 2 - blockSize / 2,
    });

    const alphaBlockL = new AlphaBlock({
      alphabet: "L",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX + blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    const alphaBlockE = new AlphaBlock({
      alphabet: "E",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX + 2 * blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    const alphaParticleX = new AlphaParticlesEffect({
      alphabet: "X",
      canvasEl: { canvas, ctx },
      height: blockSize,
      width: blockSize,
      x: initialX + 3 * blockSize,
      y: canvas.height / 2 - blockSize / 2,
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      alphaParticleA.updateMousePosition(e.x, e.y);
      alphaParticleX.updateMousePosition(e.x, e.y);
    });

    function animate() {
      requestAnimationFrame(animate);
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      alphaParticleA.update();
      alphaBlockL.draw();
      alphaBlockE.draw();
      alphaParticleX.update();
    }

    animate();
  }, [ref]);
};

export default useCanvas;
