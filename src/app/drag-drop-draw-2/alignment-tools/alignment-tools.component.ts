import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import { WorkAreaService } from '../work-area.service';

@Component({
  selector: 'alignment-tools',
  templateUrl: './alignment-tools.html',
  styles: [],
})
export class AlignmentToolsComponent implements OnInit {

  constructor(private workAreaService: WorkAreaService) {}

  ngOnInit(): void {}

  alignLefts() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(item => item.x = referenceItem.x);
  }

  alignRights() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(item => item.x = referenceItem.right - item.width);
  }

  alignHorizontalCenters() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(item => {
      item.x = (referenceItem.x + referenceItem.width / 2) - item.width / 2;
    });
  }

  alignVerticalCenters() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(item => {
      item.y = (referenceItem.y + referenceItem.height / 2) - item.height / 2;
    });
  }

  alignTops() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(item => item.y = referenceItem.y);
  }

  alignBottoms() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.selectedItems.forEach(item => item.y = referenceItem.bottom - item.height);
  }

  private getReferenceItem() {
    const [lastItemInSelection] = this.workAreaService.selectedItems.slice(-1);
    return lastItemInSelection;
  }
}
