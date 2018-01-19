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

    const sortedLeftToRight = this.workAreaService.selectedItems.slice().sort((a, b) => {
      return a.x - b.x;
    });

    // We want to split the array in two, items that are to the left of the reference item and items that are to the right of
    // the reference item. We do not want to include items with the same x position as the reference item, because they should not
    // be adjusted any further.

    // For the left split point we find the first item in the left-to-right sorted array who's x position matches the reference item's.
    // This is guaranteed to find a match, because at the very least the reference item itself will match it's own x position. Everything
    // before this index will be included in the left items array.
    const leftSplitIndex = sortedLeftToRight.findIndex(item => item.x === referenceItem.x);

    // For the right split point we find the first item in the left-to-right sorted array who's x position is greater-than (to the right of)
    // the reference items. This is not guaranteed to find a match since there could be zero items to the right of the reference item,
    // so if no match is found the split point is set to the length of the array (this will cause slice() to return an empty array).
    let rightSplitIndex = sortedLeftToRight.findIndex(item => item.x > referenceItem.x);
    rightSplitIndex = rightSplitIndex === -1 ? sortedLeftToRight.length : rightSplitIndex;

    // For proper spacing to be applied, we want the arrays sorted from closest to the reference item to the farthest away (because this
    // lets us multiply the interval by the index in the loop), so we reverse the left items.
    const leftItems = sortedLeftToRight.slice(0, leftSplitIndex).reverse();
    const rightItems = sortedLeftToRight.slice(rightSplitIndex);

    // We now have two arrays, one that contains only items that are positioned to the left of the reference item, and one that contains
    // only items positioned to the right of the reference item. The reference item itself and any other items with the same x position
    // are not included in either. We now loop through each and move them closer to the reference item by the interval * (index + 1),
    // with the current interval of 8, that means the closest item would move in 8 pixels, the next closest 16, and the next 24. This
    // creates the uniform spacing. Items closer than 8 pixels are moved closer by their distance to the reference item, making sure their
    // position matches rather than moving to the other side of it.

    leftItems.forEach((item, index) => {
      const distance = referenceItem.x - item.x;
      const isCloserThanInterval = distance < this.interval;

      if (isCloserThanInterval) {
        item.x += distance;
      } else {
        item.x += this.interval * (index + 1);
      }
    });

    rightItems.forEach((item, index) => {
      const distance = item.x - referenceItem.x;
      const isCloserThanInterval = distance < this.interval;

      if (isCloserThanInterval) {
        item.x -= distance;
      } else {
        item.x -= this.interval * (index + 1);
      }
    });
  }

  decreaseVerticalSpacing() {
    const referenceItem = this.getReferenceItem();

    this.workAreaService.selectedItems.forEach(item => {
      const difference = item.y - referenceItem.y;
      const interval = Math.abs(difference) > this.interval ? this.interval : Math.abs(difference);

      if (difference > 0) {
        item.y -= interval;
      } else {
        item.y += interval;
      }
    })
  }

  increaseHorizontalSpacing() {
    const referenceItem = this.getReferenceItem();

    this.workAreaService.selectedItems.forEach(item => {
      if (item.id !== referenceItem.id) {
        const difference = item.x - referenceItem.x;

        if (difference > 0) {
          item.x += this.interval;
        } else {
          item.x -= this.interval;
        }
      }
    })
  }

  increaseVerticalSpacing() {}

  private getReferenceItem() {
    const [lastItemInSelection] = this.workAreaService.selectedItems.slice(-1);
    return lastItemInSelection;
  }
}
