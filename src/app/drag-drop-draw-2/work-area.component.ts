import {
  Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, Renderer2, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {PositionedImage} from "./test-models/positioned-image.model";
import {PositionedElement} from "./positioned-element.interface";
import {PositionedLabel} from "./test-models/positioned-label.model";

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.html'
})
export class WorkAreaComponent implements OnInit {

  positionedElementModels: PositionedElement[];
  currentTool: string = 'image';

  constructor(private elRef:ElementRef) {
    this.positionedElementModels = [];
    this.addImage(100, 100);
    this.addLabel(300, 300);
  }

  isImage(element: PositionedElement): boolean {
    return element instanceof PositionedImage;
  }

  isLabel(element: PositionedElement): boolean {
    return element instanceof PositionedLabel;
  }

  onMouseMove(event: any) {
    // console.log(this.getMousePositionRelativeToWorkspace(event));
  }

  onMouseClick(event: any) {
    const positionData = this.getMousePositionRelativeToWorkspace(event);

    if (this.currentTool === 'image') {
      this.addImage(positionData.workspaceX, positionData.workspaceY);
    } else {
      this.addLabel(positionData.workspaceX, positionData.workspaceY);
    }

    console.log(positionData);
    console.log(this.currentTool);
  }

  private addImage(x, y) {
    const image = new PositionedImage();
    image.source = 'assets/images/stock-profile.jpg';
    image.x = x;
    image.y = y;
    this.positionedElementModels.push(image);
  }

  private addLabel(x, y) {
    const label = new PositionedLabel();
    label.text = 'test label';
    label.x = x;
    label.y = y;
    this.positionedElementModels.push(label);
  }

  //addComponent(positionData) {
  //  // Push the component so that we can keep track of which components are created
  //  this.components.push(component);
  //}
  //
  private getMousePositionRelativeToWorkspace(event: any) {
    const workspaceRectangle = this.elRef.nativeElement.getBoundingClientRect();
    return {
      workspaceX: event.clientX - workspaceRectangle.left,
      workspaceY: event.clientY - workspaceRectangle.top,
      screenX: event.clientX,
      screenY: event.clientY
    }
  }

  ngOnInit() {
  }

}
