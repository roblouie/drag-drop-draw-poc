import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import { WorkAreaService } from '../work-area.service';
import { PositionedElement } from '../positioned-element.model';

@Component({
  selector: 'size-tools',
  templateUrl: './size-tools.html',
  styles: [],
})
export class SizeToolsComponent implements OnInit {
  private referenceItem: PositionedElement;

  constructor(private workAreaService: WorkAreaService) {}

  ngOnInit(): void {}

  sameWidths() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.getSelectedElements().forEach(item => item.width = referenceItem.width);
  }

  sameHeights() {
    const referenceItem = this.getReferenceItem();
    this.workAreaService.getSelectedElements().forEach(item => item.height = referenceItem.height);
  }

  sameSize() {
    this.applySize(item => {
      item.width = this.referenceItem.width;
      item.height = this.referenceItem.height;
    });
  }

  private applySize(callback) {
    this.referenceItem = this.getReferenceItem();
    this.workAreaService.getSelectedElements().forEach(callback);
  }

  private getReferenceItem() {
    const [lastItemInSelection] = this.workAreaService.getSelectedElements().slice(-1);
    return lastItemInSelection;
  }
}
