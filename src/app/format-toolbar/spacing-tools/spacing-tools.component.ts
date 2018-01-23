import { Component } from '@angular/core';
import { SpacingService } from '../../drag-drop-draw-2/spacing.service';

@Component({
  selector: 'spacing-tools',
  templateUrl: './spacing-tools.html',
  styles: [],
})
export class SpacingToolsComponent {

  constructor(private spacingService: SpacingService) {}

  sameHorizontalSpacing() {
    this.spacingService.sameHorizontalSpacing();
  }

  sameVerticalSpacing() {
    this.spacingService.sameVerticalSpacing();
  }

  removeHorizontalSpacing() {
    this.spacingService.removeHorizontalSpacing();
  }

  removeVerticalSpacing() {
    this.spacingService.removeVerticalSpacing();
  }

  decreaseHorizontalSpacing() {
    this.spacingService.decreaseHorizontalSpacing();
  }

  decreaseVerticalSpacing() {
    this.spacingService.decreaseVerticalSpacing();
  }

  increaseHorizontalSpacing() {
    this.spacingService.increaseHorizontalSpacing();
  }

  increaseVerticalSpacing() {
    this.spacingService.increaseVerticalSpacing();
  }
}
