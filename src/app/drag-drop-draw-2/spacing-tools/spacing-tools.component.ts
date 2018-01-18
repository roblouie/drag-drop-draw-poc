import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import { WorkAreaService } from '../work-area.service';
import { PositionedElement } from '../positioned-element.model';

@Component({
  selector: 'size-tools',
  templateUrl: './size-tools.html',
  styles: [],
})
export class SpacingToolsComponent implements OnInit {
  private referenceItem: PositionedElement;

  constructor(private workAreaService: WorkAreaService) {}

  ngOnInit(): void {}

  sameHorizontalSpacing() {}

  sameVerticalSpacing() {}

  removeHorizontalSpacing() {}

  removeVerticalSpacing() {}

  decreaseHorizontalSpacing() {}

  decreaseVerticalSpacing() {}

  increaseHorizontalSpacing() {}

  increaseVerticalSpacing() {}

  private applySpacing(callback) {
    this.referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(callback);
  }

  private getReferenceItem() {
    const [lastItemInSelection] = this.workAreaService.selectedItems.slice(-1);
    return lastItemInSelection;
  }
}
