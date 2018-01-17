export abstract class PositionedElement {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }
}
