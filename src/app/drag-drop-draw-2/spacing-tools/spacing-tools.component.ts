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
  private sortLeftToRight = (a, b) => a.x - b.x;
  private sortRightToLeft = (a, b) => b.x - a.x;
  private sortTopToBottom = (a, b) => a.y - b.y;
  private sortBottomToTop = (a, b) => b.y - a.y;
  private sumUpArray = (accumulator, currentValue) => accumulator + currentValue;

  constructor(private workAreaService: WorkAreaService) {}

  ngOnInit(): void {}

  sameHorizontalSpacing() {
    const sortedLeftToRight = this.workAreaService.selectedItems.slice().sort(this.sortLeftToRight);

    let totalSpaceBetweenItems = 0;

    sortedLeftToRight.forEach((item, index, array) => {
      if (index < array.length - 1) {
        totalSpaceBetweenItems += (array[index + 1].x - item.right);
      }
    });

    const averageSpaceBetweenItems = totalSpaceBetweenItems / (sortedLeftToRight.length - 1);

    for (let i = 1; i < (sortedLeftToRight.length - 1); i++) {
      const matchedSelectedItem = this.workAreaService.selectedItems.find(item => item.id === sortedLeftToRight[i].id);
      matchedSelectedItem.x = sortedLeftToRight[i - 1].right + averageSpaceBetweenItems;
    }
  }

  sameVerticalSpacing() {
    const sortedTopToBottom = this.workAreaService.selectedItems.slice().sort(this.sortTopToBottom);

    const spaces = [];

    sortedTopToBottom.forEach((item, index, array) => {
      if (index < array.length - 1) {
        spaces.push(array[index + 1].y - item.bottom);
      }
    });

    const averageSpace = spaces.reduce(this.sumUpArray) / spaces.length;

    for (let i = 1; i < spaces.length; i++) {
      const matchedSelectedItem = this.workAreaService.selectedItems.find(item => item.id === sortedTopToBottom[i].id);
      matchedSelectedItem.y = sortedTopToBottom[i - 1].bottom + averageSpace;
    }
  }

  removeHorizontalSpacing() {
    this.workAreaService.selectedItems
      .slice()
      .sort(this.sortLeftToRight)
      .forEach((item, index, array) => {
        if (index < array.length - 1) {
          array[index + 1].x = item.right;
        }
      });
  }

  removeVerticalSpacing() {
    this.workAreaService.selectedItems
      .slice()
      .sort(this.sortTopToBottom)
      .forEach((item, index, array) => {
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

    leftItems.sort(this.sortRightToLeft);
    rightItems.sort(this.sortLeftToRight);

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

    topItems.sort(this.sortBottomToTop);
    bottomItems.sort(this.sortTopToBottom);

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
  // Items with a position above the reference item shift to the left, with items higher on the screen shifting farther to the left,
  // i.e. an item directly above the reference item will shift left the 8px interval, an item directly above that one will shift left 16px,
  // and so on.
  // Items with a position below the reference item shift to the right, with items lower on the screen shifting farther to the right,
  // i.e. an item directly below the reference item will shift right the 8px interval, an item directly below that will shift right 16px,
  // and so on.
  // Items that also share the same vertical position as the reference item will be moved to the right, with items drawn later shifting more
  // or selected later moving the greater distance
  increaseHorizontalSpacing() {
    const referenceItem = this.getReferenceItem();
    const leftItems = [];
    const rightItems = [];
    const sameXItems = [];

    this.workAreaService.selectedItems.forEach(item => {
      if (item.x < referenceItem.x) {
        leftItems.push(item);
      } else if (item.x > referenceItem.x) {
        rightItems.push(item);
      } else if (item.id !== referenceItem.id) {
        sameXItems.push(item);
      }
    });

    leftItems.sort(this.sortRightToLeft);
    rightItems.sort(this.sortLeftToRight);
    sameXItems.sort(this.sortTopToBottom);

    const itemsToAddToRight = [];
    sameXItems.forEach(item => {
      if (item.y < referenceItem.y) {
        leftItems.unshift(item);
      } else {
        itemsToAddToRight.push(item);
      }
    });

    rightItems.unshift(...itemsToAddToRight);

    leftItems.forEach((item, index) => {
      item.x -= this.interval * (index + 1);
    });

    rightItems.forEach((item, index) => {
      item.x += this.interval * (index + 1);
    });
  }

  increaseVerticalSpacing() {
    const referenceItem = this.getReferenceItem();
    const topItems = [];
    const bottomItems = [];
    const sameYItems = [];

    this.workAreaService.selectedItems.forEach(item => {
      if (item.y < referenceItem.y) {
        topItems.push(item);
      } else if (item.y > referenceItem.y) {
        bottomItems.push(item);
      } else if (item.id !== referenceItem.id) {
        sameYItems.push(item);
      }
    });

    topItems.sort(this.sortBottomToTop);
    bottomItems.sort(this.sortTopToBottom);
    sameYItems.sort(this.sortLeftToRight);

    const itemsToAddToBottom = [];
    sameYItems.forEach(item => {
      if (item.x < referenceItem.x) {
        topItems.unshift(item);
      } else {
        itemsToAddToBottom.push(item);
      }
    });

    bottomItems.unshift(...itemsToAddToBottom);

    topItems.forEach((item, index) => {
      item.y -= this.interval * (index + 1);
    });

    bottomItems.forEach((item, index) => {
      item.y += this.interval * (index + 1);
    });
  }

  private getReferenceItem() {
    const [lastItemInSelection] = this.workAreaService.selectedItems.slice(-1);
    return lastItemInSelection;
  }
}
