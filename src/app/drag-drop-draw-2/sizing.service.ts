import { Injectable } from '@angular/core';
import { PositionedElementService } from './positioned-element.service';

@Injectable()
export class SizingService {
  constructor(private positionedElementService: PositionedElementService) {}
  
  sameWidths() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => item.width = referenceElement.width);
  }

  sameHeights() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => item.height = referenceElement.height);
  }

  sameSize() {
    const referenceElement = this.positionedElementService.getReferenceElement();
    this.positionedElementService.getSelectedElements().forEach(item => {
      item.width = referenceElement.width;
      item.height = referenceElement.height;
    });
  }
}