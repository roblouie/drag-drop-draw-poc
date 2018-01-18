import {Injectable} from "@angular/core";
import {PositionedElement} from "./positioned-element.model";

@Injectable()
export class WorkAreaService {
  positionedElementModels: PositionedElement[] = [];
  selectedItems: PositionedElement[] = [];

  removeItemFromSelection(itemToRemove: PositionedElement) {
    const selectedIndex = this.selectedItems.indexOf(itemToRemove);
    this.selectedItems.splice(selectedIndex, 1);
  }
}
