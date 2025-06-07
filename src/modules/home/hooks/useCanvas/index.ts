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
      const isLeftCursorPressed = e.buttons === 1;
      nameEffect.alphaA.updateMousePosition(e.x, e.y, isLeftCursorPressed);
      nameEffect.alphaL.updateMousePosition(e.x, e.y, isLeftCursorPressed);
      nameEffect.alphaE.updateMousePosition(e.x, e.y, isLeftCursorPressed);
      nameEffect.alphaX.updateMousePosition(e.x, e.y, isLeftCursorPressed);
      const shouldChangePointer = nameEffect.alphaL.isCursorPointer();
      canvas.style.cursor = shouldChangePointer ? "pointer" : "default";
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
