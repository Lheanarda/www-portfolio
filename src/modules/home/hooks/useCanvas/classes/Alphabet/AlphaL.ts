import { CanvasProps } from "../../typings/canvas";
import Slider from "../Slider";
import AlphaBlock, { AlphaBlockProps } from "./AlphaBlock";

class AlphaL extends AlphaBlock {
  slider = {} as Slider;

  constructor(props: CanvasProps<AlphaBlockProps>) {
    super(props);
    const sliderOriginX = this.x + this.width / 2.8;
    const sliderOriginY = this.y + this.height / 4.2;
    const sliderOffsetY = sliderOriginY + this.height / 2;
    this.slider = new Slider({
      startX: sliderOriginX,
      startY: sliderOriginY,
      maxOffsetX: sliderOriginX,
      maxOffsetY: sliderOffsetY,
      thumbRadius: this.width / 30,
      canvasEl: props.canvasEl,
      color: "#fff",
    });
  }

  isCursorPointer() {
    return this.slider.isCursorPointer();
  }

  update() {
    super.update();
    this.slider.update();
  }

  updateMousePosition(x: number, y: number, pressed: boolean) {
    super.updateMousePosition(x, y, pressed);
    this.slider.updateMousePosition(x, y, pressed);
  }
}

export default AlphaL;
