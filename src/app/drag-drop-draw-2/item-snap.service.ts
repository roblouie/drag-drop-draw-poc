import { Injectable } from '@angular/core';
import { PositionedElementService } from './positioned-element.service';
import { Point } from './point.model';
import { PositionedElement } from './positioned-elements/positioned-element.model';

@Injectable()
export class ItemSnapService {
  currentReferenceElement: PositionedElement;
  unselectedItems: PositionedElement[];
  snapRange = 10;
  unsnapDistance = 10;
  mousePositionAtSnap: Point;
  isLeftSnapped = false;
  isTopSnapped = false;
  isRightSnapped = false;
  isBottomSnapped = false;
  shouldResetPosition = false;

  constructor(private positionedElementService: PositionedElementService) {}

  setupAlignmentCheck() {
    this.currentReferenceElement = this.positionedElementService.getReferenceElement();
    this.unselectedItems = this.positionedElementService.getAllUnselectedElements();
  }

  checkAlignment(currentPosition: Point) {
    this.unselectedItems.forEach(item => {
      this.checkLeftSnap(currentPosition, item);
      this.checkTopSnap(currentPosition, item);
      this.checkRightSnap(currentPosition, item);
      this.checkBottomSnap(currentPosition, item);
    });
  }

  private checkLeftSnap(currentPosition, item) {
    // are we already snapped?
    if (this.isLeftSnapped) {
      // if so, check how far the mouse has moved since the snap
      const mousePositionDifference = Math.abs(currentPosition.x - this.mousePositionAtSnap.x);

      // if we've moved beyond the unsnap distance, mark ourselves as un-snapped, and set the flag telling us we need to
      // reset the position of the reference element to where it would have been if it hadn't snapped in
      if (mousePositionDifference >= this.unsnapDistance) {
        this.isLeftSnapped = false;
        this.shouldResetPosition = true;
      }
    } else {
      // if we're not snapped, check if we are close enough to an item to snap
      const edgeDifference = Math.abs(item.x - this.currentReferenceElement.x);
      const areEdgesCloseEnough = edgeDifference <= this.snapRange;

      // if we are close enough, set our isSnapped boolean to true, and capture the current mouse position
      if (areEdgesCloseEnough) {
        this.mousePositionAtSnap = currentPosition;
        this.isLeftSnapped = true;
      }
    }

    if (this.isLeftSnapped) {
      this.currentReferenceElement.x = item.x;
    }

    // if our flag was set to put the reference element back where it would have been if no snapping has occurred,
    // put the position back where it would have been and unset the flag
    if (this.shouldResetPosition) {
      this.currentReferenceElement.x += (currentPosition.x - this.mousePositionAtSnap.x);
      this.shouldResetPosition = false;
    }
  }

  private checkTopSnap(currentPosition, item) {
    // are we already snapped?
    if (this.isTopSnapped) {
      // if so, check how far the mouse has moved since the snap
      const mousePositionDifference = Math.abs(currentPosition.y - this.mousePositionAtSnap.y);

      // if we've moved beyond the unsnap distance, mark ourselves as un-snapped, and set the flag telling us we need to
      // reset the position of the reference element to where it would have been if it hadn't snapped in
      if (mousePositionDifference >= this.unsnapDistance) {
        this.isTopSnapped = false;
        this.shouldResetPosition = true;
      }
    } else {
      // if we're not snapped, check if we are close enough to an item to snap
      const edgeDifference = Math.abs(item.y - this.currentReferenceElement.y);
      const areEdgesCloseEnough = edgeDifference <= this.snapRange;

      // if we are close enough, set our isSnapped boolean to true, and capture the current mouse position
      if (areEdgesCloseEnough) {
        this.mousePositionAtSnap = currentPosition;
        this.isTopSnapped = true;
      }
    }

    if (this.isTopSnapped) {
      this.currentReferenceElement.y = item.y;
    }

    // if our flag was set to put the reference element back where it would have been if no snapping has occurred,
    // put the position back where it would have been and unset the flag
    if (this.shouldResetPosition) {
      this.currentReferenceElement.y += (currentPosition.y - this.mousePositionAtSnap.y);
      this.shouldResetPosition = false;
    }
  }

  private checkRightSnap(currentPosition, item) {
    // are we already snapped?
    if (this.isRightSnapped) {
      // if so, check how far the mouse has moved since the snap
      const mousePositionDifference = Math.abs(currentPosition.x - this.mousePositionAtSnap.x);

      // if we've moved beyond the unsnap distance, mark ourselves as un-snapped, and set the flag telling us we need to
      // reset the position of the reference element to where it would have been if it hadn't snapped in
      if (mousePositionDifference >= this.unsnapDistance) {
        this.isRightSnapped = false;
        this.shouldResetPosition = true;
      }
    } else {
      // if we're not snapped, check if we are close enough to an item to snap
      const edgeDifference = Math.abs(item.right - this.currentReferenceElement.right);
      const areEdgesCloseEnough = edgeDifference <= this.snapRange;
      console.log(edgeDifference);

      // if we are close enough, set our isSnapped boolean to true, and capture the current mouse position
      if (areEdgesCloseEnough) {
        this.mousePositionAtSnap = currentPosition;
        this.isRightSnapped = true;
      }
    }

    if (this.isRightSnapped) {
      this.currentReferenceElement.x = item.right - this.currentReferenceElement.width;
    }

    // if our flag was set to put the reference element back where it would have been if no snapping has occurred,
    // put the position back where it would have been and unset the flag
    if (this.shouldResetPosition) {
      this.currentReferenceElement.x += (currentPosition.x - this.mousePositionAtSnap.x);
      this.shouldResetPosition = false;
    }
  }

  private checkBottomSnap(currentPosition, item) {
    // are we already snapped?
    if (this.isBottomSnapped) {
      // if so, check how far the mouse has moved since the snap
      const mousePositionDifference = Math.abs(currentPosition.y - this.mousePositionAtSnap.y);

      // if we've moved beyond the unsnap distance, mark ourselves as un-snapped, and set the flag telling us we need to
      // reset the position of the reference element to where it would have been if it hadn't snapped in
      if (mousePositionDifference >= this.unsnapDistance) {
        this.isBottomSnapped = false;
        this.shouldResetPosition = true;
      }
    } else {
      // if we're not snapped, check if we are close enough to an item to snap
      const edgeDifference = Math.abs(item.bottom - this.currentReferenceElement.bottom);
      const areEdgesCloseEnough = edgeDifference <= this.snapRange;

      // if we are close enough, set our isSnapped boolean to true, and capture the current mouse position
      if (areEdgesCloseEnough) {
        this.mousePositionAtSnap = currentPosition;
        this.isBottomSnapped = true;
      }
    }

    if (this.isBottomSnapped) {
      this.currentReferenceElement.y = item.bottom - this.currentReferenceElement.height;
    }

    // if our flag was set to put the reference element back where it would have been if no snapping has occurred,
    // put the position back where it would have been and unset the flag
    if (this.shouldResetPosition) {
      this.currentReferenceElement.y += (currentPosition.y - this.mousePositionAtSnap.y);
      this.shouldResetPosition = false;
    }
  }
}
