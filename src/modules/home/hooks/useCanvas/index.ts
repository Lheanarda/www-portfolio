import { RefObject, useEffect } from "react";
import NameEffect from "./classes/NameEffect";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    //settings
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nameEffect = new NameEffect({ canvasEl: { canvas, ctx } });

    window.addEventListener("mousemove", (e: MouseEvent) => {
      // particle system alphabet
      nameEffect.alphaA.updateMousePosition(e.x, e.y);
      nameEffect.alphaX.updateMousePosition(e.x, e.y);
    });

    function animate() {
      requestAnimationFrame(animate);
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      nameEffect.update();
    }

    animate();
  }, [ref]);
};

export default useCanvas;
