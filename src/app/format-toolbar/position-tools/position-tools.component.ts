import { Component } from '@angular/core';
import { PositionedElementService } from '../../drag-drop-draw-2/positioned-element.service';
import { AlignmentService } from '../../drag-drop-draw-2/alignment.service'

@Component({
  selector: 'position-tools',
  templateUrl: './position-tools.html',
  styles: [],
})
export class PositionToolsComponent {
  constructor(
    private positionedElementService: PositionedElementService,
    private alignmentService: AlignmentService,
  ) {}

  sendToBack() {
    this.positionedElementService.sendToBack();
  }

  sendToFront() {
    this.positionedElementService.sendToFront();
  }

  centerHorizontally() {
    this.alignmentService.alignSelectionHorizontally();
  }

  centerVertically() {
    this.alignmentService.alignSelectionVertically();
  }
}
