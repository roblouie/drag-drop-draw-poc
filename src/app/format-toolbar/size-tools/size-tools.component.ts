import { Component } from '@angular/core';
import { SizingService } from '../../drag-drop-draw-2/sizing.service';

@Component({
  selector: 'size-tools',
  templateUrl: './size-tools.html',
  styles: [],
})
export class SizeToolsComponent {

  constructor(private sizingService: SizingService) {}

  sameWidths() {
    this.sizingService.sameWidths();
  }

  sameHeights() {
    this.sizingService.sameHeights();
  }

  sameSize() {
    this.sizingService.sameSize();
  }
}
