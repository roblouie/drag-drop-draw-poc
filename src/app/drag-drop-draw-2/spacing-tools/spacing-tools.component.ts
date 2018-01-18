import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { WorkAreaService } from '../work-area.service';
import { PositionedElement } from '../positioned-element.model';

@Component({
  selector: 'spacing-tools',
  templateUrl: './spacing-tools.html',
  styles: [],
})
export class SpacingToolsComponent implements OnInit {
  private referenceItem: PositionedElement;

  constructor(private workAreaService: WorkAreaService) {}

  ngOnInit(): void {}

  sameHorizontalSpacing() {
    const sortedLeftToRight = this.workAreaService.selectedItems.slice().sort((a, b) => {
      return a.x - b.x;
    });

    const spaces = [];

    sortedLeftToRight.forEach((item, index, array) => {
      if (index < array.length - 1) {
        spaces.push(array[index + 1].x - item.right);
      }
    });

    const averageSpace = spaces.reduce((accumulator, currentValue) => accumulator + currentValue) / spaces.length;

    for (let i = 1; i < spaces.length; i++) {
      const matchedSelectedItem = this.workAreaService.selectedItems.find(item => item.id === sortedLeftToRight[i].id);
      matchedSelectedItem.x = sortedLeftToRight[i - 1].right + averageSpace;
    }
  }

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
