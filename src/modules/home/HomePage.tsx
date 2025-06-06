import React, { useRef } from "react";
import Canvas from "../../components/canvas";
import useCanvas from "./hooks/useCanvas";

const HomePage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvas(ref);

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Canvas
        className=" w-full bg-[#FCFCF5] absolute left-0 top-0 -z-10"
        ref={ref}
      />
    </div>
  );
};
export default HomePage;
