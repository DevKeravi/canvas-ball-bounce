import Vector from './vector';

export default class Shape {
  position: Vector;

  constructor(position: Vector) {
    this.position = position;
  }

  update(delta: number) {}

  render(context: CanvasRenderingContext2D) {}
}
