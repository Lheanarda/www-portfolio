export interface Position {
  x: number;
  y: number;
}

export interface CanvasEl {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
export type CanvasProps<T = Record<string, unknown>> = {
  canvasEl: CanvasEl;
} & T;

export interface MouseState {
  x: number;
  y: number;
  pressed: boolean;
}
