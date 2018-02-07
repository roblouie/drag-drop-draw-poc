import { Rectangle } from '../../shared/geometry/rectangle.model';

export abstract class PositionedElement {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;

  get right() {
    return this.x + this.width;
  }

  get bottom() {
    return this.y + this.height;
  }

  get boundingRectangle(): Rectangle {
    return new Rectangle(this.y, this.x, this.width, this.height);
  }
}
