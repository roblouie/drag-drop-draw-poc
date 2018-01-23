import { Component } from '@angular/core';
import { AlignmentService } from '../../drag-drop-draw-2/alignment.service';

@Component({
  selector: 'alignment-tools',
  templateUrl: './alignment-tools.html',
  styles: [],
})
export class AlignmentToolsComponent {

  constructor(private alignmentService: AlignmentService) {}

  alignLefts() {
    this.alignmentService.alignLefts();
  }

  alignRights() {
    this.alignmentService.alignRights();
  }

  alignHorizontalCenters() {
    this.alignmentService.alignHorizontalCenters();
  }

  alignVerticalCenters() {
    this.alignmentService.alignVerticalCenters();
  }

  alignTops() {
    this.alignmentService.alignTops();
  }

  alignBottoms() {
    this.alignmentService.alignBottoms();
  }
}
