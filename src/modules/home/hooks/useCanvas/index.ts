import { CanvasHTMLAttributes, RefObject, useEffect, useState } from "react";
import { handleRandomRadius } from "./utils";
import Temp from "./classes/Temp";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    //settings
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tempComponent = new Temp({ canvasEl: { canvas, ctx } });

    function animate() {
      requestAnimationFrame(animate);
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      tempComponent.draw();
    }

    animate();
  }, [ref]);
};

export default useCanvas;
