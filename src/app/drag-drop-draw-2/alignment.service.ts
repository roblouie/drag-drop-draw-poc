import { Injectable } from '@angular/core';
import { PositionedElementService } from './positioned-element.service';

@Injectable()
export class AlignmentService {
  private sortLeftToRight = (a, b) => a.x - b.x;
  private sortTopToBottom = (a, b) => a.y - b.y;

  constructor(private positionedElementService: PositionedElementService) {}

  alignLefts() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => item.x = referenceElement.x);
  }

  alignRights() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => item.x = referenceElement.right - item.width);
  }

  alignHorizontalCenters() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => {
      item.x = (referenceElement.x + referenceElement.width / 2) - item.width / 2;
    });
  }

  alignVerticalCenters() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => {
      item.y = (referenceElement.y + referenceElement.height / 2) - item.height / 2;
    });
  }

  alignTops() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => item.y = referenceElement.y);
  }

  alignBottoms() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => item.y = referenceElement.bottom - item.height);
  }

  alignSelectionHorizontally() {
    const sortedLeftToRight = this.positionedElementService.getSelectedElements().sort(this.sortLeftToRight);
    const farthestLeft: number = sortedLeftToRight[0].x;
    const farthestRight: number = sortedLeftToRight[sortedLeftToRight.length - 1].right;

    //  NOTE: Using the fixed width of the temporary "canvas" area, the real app will need to get the
    // dynamic canvas width (because it will be resizable by the user)
    const canvasWidth = 900;
    const rightDistance = canvasWidth - farthestRight;
    const averageSpace = (farthestLeft + rightDistance) / 2;
    const distanceToMove = averageSpace - farthestLeft;

    this.positionedElementService.getSelectedElements().forEach(element => element.x += distanceToMove);
  }

  alignSelectionVertically() {
    const sortedTopToBottom = this.positionedElementService.getSelectedElements().sort(this.sortTopToBottom);
    const farthestTop: number = sortedTopToBottom[0].y;
    const farthestBottom: number = sortedTopToBottom[sortedTopToBottom.length - 1].bottom;

    // NOTE: Using the fixed height of the temporary "canvas" area, the real app will need to get the
    // dynamic canvas height (because it will be resizable by the user)
    const canvasHeight = 600;
    const bottomDistance = canvasHeight - farthestBottom;
    const averageSpace = (farthestTop + bottomDistance) / 2;
    const distanceToMove = averageSpace - farthestTop;

    this.positionedElementService.getSelectedElements().forEach(element => element.y += distanceToMove);
  }
}
