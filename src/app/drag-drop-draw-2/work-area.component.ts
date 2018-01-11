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
  templateUrl: './work-area.html',
  styleUrls: ['./work-area.scss']
})
export class WorkAreaComponent implements OnInit {

  positionedElementModels: PositionedElement[] = [];
  currentTool: string = 'image';
  startingPosition;
  isDrawing: boolean = false;
  dragBox;
  @ViewChild('container') private containerElement: ElementRef;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.dragBox = this.renderer.createElement('div');
    this.renderer.addClass(this.dragBox, 'selector');
  }

  isImage(element: PositionedElement): boolean {
    return element instanceof PositionedImage;
  }

  isLabel(element: PositionedElement): boolean {
    return element instanceof PositionedLabel;
  }

  onMouseUp(event: any) {
    if (!this.isDrawing) {
      return;
    }

    const endingPosition = this.getMousePositionRelativeToWorkspace(event);
    const top = this.startingPosition.workspaceY < endingPosition.workspaceY ? this.startingPosition.workspaceY : endingPosition.workspaceY;
    const left = this.startingPosition.workspaceX < endingPosition.workspaceX ? this.startingPosition.workspaceX : endingPosition.workspaceX;
    let width = Math.abs(this.startingPosition.workspaceX - endingPosition.workspaceX);
    let height = Math.abs(this.startingPosition.workspaceY - endingPosition.workspaceY);

    // set width and height to default minimum if the user just clicked or barely dragged
    if (width <= 2 && height <= 2) {
      width = 100;
      height = 50;
    }

    if (this.currentTool === 'image') {
      this.addImage(left, top, width, height);
    } else {
      this.addLabel(left, top, width, height);
    }

    this.isDrawing = false;
    this.startingPosition = null;

    console.log(endingPosition);
    console.log(this.currentTool);

    this.renderer.removeChild(this.containerElement.nativeElement, this.dragBox);
  }

  onMouseMove(event: any) {
    if (!this.isDrawing) {
      return;
    }

    const currentPosition = this.getMousePositionRelativeToWorkspace(event);
    const top = this.startingPosition.workspaceY < currentPosition.workspaceY ? this.startingPosition.workspaceY : currentPosition.workspaceY;
    const left = this.startingPosition.workspaceX < currentPosition.workspaceX ? this.startingPosition.workspaceX : currentPosition.workspaceX;
    let width = Math.abs(this.startingPosition.workspaceX - currentPosition.workspaceX);
    let height = Math.abs(this.startingPosition.workspaceY - currentPosition.workspaceY);
    this.renderer.setStyle(this.dragBox, 'top', `${top}px`);
    this.renderer.setStyle(this.dragBox, 'left', `${left}px`);
    this.renderer.setStyle(this.dragBox, 'height', `${height}px`);
    this.renderer.setStyle(this.dragBox, 'width', `${width}px`);
  }

  onMouseDown(event: any) {
    this.isDrawing = true;
    this.startingPosition = this.getMousePositionRelativeToWorkspace(event);
    this.renderer.setStyle(this.dragBox, 'top', `${this.startingPosition.workspaceY}px`);
    this.renderer.setStyle(this.dragBox, 'left', `${this.startingPosition.workspaceX}px`);
    this.renderer.setStyle(this.dragBox, 'height', `0px`);
    this.renderer.setStyle(this.dragBox, 'width', `0px`);

    this.renderer.appendChild(this.containerElement.nativeElement, this.dragBox);
  }

  private addImage(x, y, width, height) {
    const image = new PositionedImage();
    image.source = 'assets/images/koala.jpg';
    image.x = x;
    image.y = y;
    image.width = width;
    image.height = height;
    this.positionedElementModels.push(image);
  }

  private addLabel(x, y, width, height) {
    const label = new PositionedLabel();
    label.text = 'test label';
    label.x = x;
    label.y = y;
    label.width = width;
    label.height = height;
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

}
