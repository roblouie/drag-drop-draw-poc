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
  readonly interval = 8;

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

  sameVerticalSpacing() {
    const sortedTopToBottom = this.workAreaService.selectedItems.slice().sort((a, b) => {
      return a.y - b.y;
    });

    const spaces = [];

    sortedTopToBottom.forEach((item, index, array) => {
      if (index < array.length - 1) {
        spaces.push(array[index + 1].y - item.bottom);
      }
    });

    const averageSpace = spaces.reduce((accumulator, currentValue) => accumulator + currentValue) / spaces.length;

    for (let i = 1; i < spaces.length; i++) {
      const matchedSelectedItem = this.workAreaService.selectedItems.find(item => item.id === sortedTopToBottom[i].id);
      matchedSelectedItem.y = sortedTopToBottom[i - 1].bottom + averageSpace;
    }
  }

  removeHorizontalSpacing() {
    const sortedLeftToRight = this.workAreaService.selectedItems.slice().sort((a, b) => {
      return a.x - b.x;
    });

    sortedLeftToRight.forEach((item, index, array) => {
      if (index < array.length - 1) {
        array[index + 1].x = item.right;
      }
    });
  }

  removeVerticalSpacing() {
    const sortedTopToBottom = this.workAreaService.selectedItems.slice().sort((a, b) =>  a.y - b.y);

    sortedTopToBottom.forEach((item, index, array) => {
      if (index < array.length - 1) {
        array[index + 1].y = item.bottom;
      }
    });
  }

  decreaseHorizontalSpacing() {
    const referenceItem = this.getReferenceItem();
    const leftItems = [];
    const rightItems = [];

    this.workAreaService.selectedItems.forEach(item => {
      if (item.x < referenceItem.x) {
        leftItems.push(item);
      } else if (item.x > referenceItem.x) {
        rightItems.push(item);
      }
    });

    leftItems.sort((a, b) => b.x - a.x);
    rightItems.sort((a, b) => a.x - b.x);

    leftItems.forEach((item, index, array) => {
      const itemToTheRight = index === 0 ? referenceItem : array[index - 1];
      const distanceToRightItem = itemToTheRight.x - item.x;
      const thisInterval = this.interval * (index + 1);

      item.x += distanceToRightItem < thisInterval ? distanceToRightItem : thisInterval;
    });

    rightItems.forEach((item, index, array) => {
      const itemToTheLeft = index === 0 ? referenceItem : array[index - 1];
      const distanceToLeftItem = item.x - itemToTheLeft.x;
      const thisInterval = this.interval * (index + 1);

      item.x -= distanceToLeftItem < thisInterval ? distanceToLeftItem : thisInterval;
    });
  }

  decreaseVerticalSpacing() {
    const referenceItem = this.getReferenceItem();
    const topItems = [];
    const bottomItems = [];

    this.workAreaService.selectedItems.forEach(item => {
      if (item.y < referenceItem.y) {
        topItems.push(item);
      } else if (item.y > referenceItem.y) {
        bottomItems.push(item);
      }
    });

    topItems.sort((a, b) => b.y - a.y);
    bottomItems.sort((a, b) => a.y - b.y);

    topItems.forEach((item, index, array) => {
      const itemToTheRight = index === 0 ? referenceItem : array[index - 1];
      const distanceToRightItem = itemToTheRight.y - item.y;
      const thisInterval = this.interval * (index + 1);

      item.y += distanceToRightItem < thisInterval ? distanceToRightItem : thisInterval;
    });

    bottomItems.forEach((item, index, array) => {
      const itemToTheLeft = index === 0 ? referenceItem : array[index - 1];
      const distanceToLeftItem = item.y - itemToTheLeft.y;
      const thisInterval = this.interval * (index + 1);

      item.y -= distanceToLeftItem < thisInterval ? distanceToLeftItem : thisInterval;
    });
  }

  // If all left edges are different it's easy to just make two lists and spread them apart, ultimately the exact opposite of
  // decrease vertical spacing. However if any left edges line up, the split becomes different.

  // Items  with the same left edge as the reference item are then adjusted as follows:
  // Items with a vertical position above the reference item shift to the left, with items higher on the screen shifting farther to the left,
  // i.e. an item directly above the reference item will shift left the 8px interval, an item directly above that one will shift left 16px,
  // and so on.
  // Items with a vertical position below the reference item shift to the right, with items lower on the screen shifting farther to the right,
  // i.e. an item directly below the reference item will shift right the 8px interval, an item directly below that one will shift right 16px,
  // and so on.
  // Items that also share the same vertical position as the reference item will be moved to the right, with items drawn later shifting more
  // or selected later moving the greater distance
  increaseHorizontalSpacing() {
    const referenceItem = this.getReferenceItem();
    const leftItems = [];
    const rightItems = [];

    // if at the same x position as reference, send to the right.
    this.workAreaService.selectedItems.forEach(item => {
      if (item.x < referenceItem.x) {
        leftItems.push(item);
      } else if (item.id !== referenceItem.id) {
        rightItems.push(item);
      }
    });

    leftItems.sort((a, b) => b.x - a.x);
    rightItems.sort((a, b) => a.x - b.x);

    leftItems.forEach((item, index, array) => {
      item.x -= this.interval * (index + 1);
    });

    rightItems.forEach((item, index, array) => {
      item.x += this.interval * (index + 1);
    });
  }

  increaseVerticalSpacing() {
    const referenceItem = this.getReferenceItem();

    this.workAreaService.selectedItems.forEach(item => {
      if (item.id !== referenceItem.id) {
        const difference = item.y - referenceItem.y;

        if (difference > 0) {
          item.y += this.interval;
        } else {
          item.y -= this.interval;
        }
      }
    });
  }

  private getReferenceItem() {
    const [lastItemInSelection] = this.workAreaService.selectedItems.slice(-1);
    return lastItemInSelection;
  }
}
