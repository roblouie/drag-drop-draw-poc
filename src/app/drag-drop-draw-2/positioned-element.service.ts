import { Injectable } from '@angular/core';
import { PositionedElement } from './positioned-elements/positioned-element.model';

/**
 *  This service manages what items the user selects within the "work area".
 *
 *  The service methods are created to ensure the proper order of the selection. Order is important because of the "reference item". The
 *  reference items serves as the reference for the other selected items when spacing or sizing tools are run against the selection. For
 *  example, when the "Same Size" tool is used, all selected items will become the same size as the reference item. This applies to all
 *  selection tools, alignment tools will align against the reference, spacing tools will space out relative to the reference.
 *
 *  Due to the importance of the order the actual array of the selected items is not accessible outside of this class, only a copy of it is.
 *
 *  The order of the selection is maintained so that the last item in the array is the reference item. This was done due to the rules of the
 *  reference item and how elements are drawn in the work area. The work area keeps a list of all elements drawn in it, and the list is in
 *  drawing order, with each item being drawn on top of the item before it.
 *
 *  If items are selected simultaneously (by dragging a rectangle over them), the reference item is the one drawn on top of the others in
 *  the selection. The work area creates a simultaneous selection by filtering down the list of all items to only those who intersect the
 *  selection rectangle. So while your selection may only be a subset of all the items in the work area, the order is maintained, so the
 *  last item will be the reference item.
 *
 *  If items are removed from the selection (by holding ctrl and clicking them), the reference will be maintained properly automatically.
 *  Since the selection is in draw order, even if you remove the last item in the array, the new last item will become the proper reference
 *  item, as it will be the last drawn item of the remaining selection.
 *
 *  Individual selections work differently. If a user selects items individually (by clicking the first one and ctrl+clicking any additional
 *  ones), the reference item is determined by the order the user clicked them, with the first clicked item being the reference. This is why
 *  addElementToSelection and addElementsToSelection both use unshift instead of push; added items are added to the front of the array.
 *
 *  Just as with simultaneous selections, the reference is maintained automatically if items are removed from the selection. Since the
 *  selection is in reverse order of user clicks, even if you remove the last item in the array, the new last item will become the proper
 *  reference item, as it will be the earliest clicked item of the remaining selection.
 *
 *  The other rule of the reference item is that the user can change it at any time by simply clicking on an already selected item. This
 *  will make the item they click the new reference. The setElementAsReference method handles this and moves the clicked item to the end of
 *  the array.
 *
 *  It is of course possible to have a selection made up of simultaneously selected items and individually selected items, however the
 *  same rules still apply and the reference item will be correct automatically.
 */

@Injectable()
export class PositionedElementService {
  positionedElementModels: PositionedElement[] = [];
  private selectedElements: PositionedElement[] = [];

  /**
   * @description Returns a copy of the selected elements array. The selectedElements array itself is not accessible outside of this class
   * to ensure it's order cannot be changed (for instance by calling .sort() on it). See description of service for information on
   * importance of order.
   * @returns {PositionedElement[]}
   */
  getSelectedElements() {
    return this.selectedElements.slice();
  }

  setSelectedElements(selectedItems: PositionedElement[]) {
    this.selectedElements = selectedItems;
  }

  addElementToSelection(itemToAdd: PositionedElement) {
    this.selectedElements.unshift(itemToAdd);
  }

  addElementsToSelection(itemsToAdd: PositionedElement[]) {
    this.selectedElements.unshift(...itemsToAdd);
  }

  removeElementFromSelection(itemToRemove: PositionedElement) {
    const selectedIndex = this.selectedElements.indexOf(itemToRemove);
    this.selectedElements.splice(selectedIndex, 1);
  }

  isElementSelected(elementToCheck: PositionedElement): boolean {
    return this.selectedElements.includes(elementToCheck);
  }

  isReferenceElement(elementToCheck: PositionedElement): boolean {
    return elementToCheck === this.getReferenceElement();
  }

  setReferenceElement(elementToSet: PositionedElement) {
    const elementIndex = this.selectedElements.indexOf(elementToSet);
    this.selectedElements.splice(elementIndex, 1);
    this.selectedElements.push(elementToSet);
  }

  getReferenceElement() {
    const [lastItemInSelection] = this.selectedElements.slice(-1);
    return lastItemInSelection;
  }
}
