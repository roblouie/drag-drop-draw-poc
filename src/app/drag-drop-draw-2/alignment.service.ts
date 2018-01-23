import { Injectable } from '@angular/core';
import { PositionedElementService } from './positioned-element.service';

@Injectable()
export class AlignmentService {
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
}