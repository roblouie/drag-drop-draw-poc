import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PositionedImage } from './test-models/positioned-image.model';
import { PositionedElement } from './positioned-element.model';
import { PositionedLabel } from './test-models/positioned-label.model';
import { Point } from './point.model';
import { WorkAreaService } from './work-area.service';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.html',
  styleUrls: ['./work-area.scss']
})
export class WorkAreaComponent implements OnInit {
  currentTool = 'image';
  startingPosition;
  isDrawing = false;
  isMoving = false;
  dragBox;
  @ViewChild('container') private containerElement: ElementRef;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private workAreaService: WorkAreaService,
  ) {}

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
    if (this.isDrawing) {
      const endingPosition = this.getMousePositionRelativeToWorkspace(event);
      const top = this.startingPosition.y < endingPosition.y ? this.startingPosition.y : endingPosition.y;
      const left = this.startingPosition.x < endingPosition.x ? this.startingPosition.x : endingPosition.x;
      let width = Math.abs(this.startingPosition.x - endingPosition.x);
      let height = Math.abs(this.startingPosition.y - endingPosition.y);

      // set width and height to default minimum if the user just clicked or barely dragged
      if (this.currentTool !== 'select' && width <= 2 && height <= 2) {
        width = 100;
        height = 50;
      }

      switch (this.currentTool) {
        case 'select':
          this.createMultiSelection(left, top, width, height);
          break;
        case 'image':
          this.addImage(left, top, width, height);
          break;
        case 'label':
          this.addLabel(left, top, width, height);
          break;

      }
      this.isDrawing = false;
      this.renderer.removeChild(this.containerElement.nativeElement, this.dragBox);
    }

    this.isMoving = false;
    this.startingPosition = null;
  }

  onMouseMove(event: any) {
    const currentPosition = this.getMousePositionRelativeToWorkspace(event);
    if (this.isDrawing) {
      const top = this.startingPosition.y < currentPosition.y ? this.startingPosition.y : currentPosition.y;
      const left = this.startingPosition.x < currentPosition.x ? this.startingPosition.x : currentPosition.x;
      const width = Math.abs(this.startingPosition.x - currentPosition.x);
      const height = Math.abs(this.startingPosition.y - currentPosition.y);
      this.renderer.setStyle(this.dragBox, 'top', `${top}px`);
      this.renderer.setStyle(this.dragBox, 'left', `${left}px`);
      this.renderer.setStyle(this.dragBox, 'height', `${height}px`);
      this.renderer.setStyle(this.dragBox, 'width', `${width}px`);
    } else if (this.isMoving) {
      const distance = new Point(currentPosition.x - this.startingPosition.x, currentPosition.y - this.startingPosition.y);
      this.workAreaService.selectedItems.forEach(item => {
        item.x += distance.x;
        item.y += distance.y;
      });
      this.startingPosition = currentPosition;
    }
  }

  onMouseDown(event: any) {
    const clickedElementID: string = event.target.id;
    const elementID: number = Number(clickedElementID);
    const isClickingEmptyWorkspaceArea = clickedElementID === 'work-area';
    this.startingPosition = this.getMousePositionRelativeToWorkspace(event);

    if (isClickingEmptyWorkspaceArea || this.currentTool !== 'select') {
        this.isDrawing = true;
        this.renderer.setStyle(this.dragBox, 'top', `${this.startingPosition.y}px`);
        this.renderer.setStyle(this.dragBox, 'left', `${this.startingPosition.x}px`);
        this.renderer.setStyle(this.dragBox, 'height', `0px`);
        this.renderer.setStyle(this.dragBox, 'width', `0px`);

        this.renderer.appendChild(this.containerElement.nativeElement, this.dragBox);
    } else {
      this.isMoving = true;
      const selectedItem = this.workAreaService.positionedElementModels.find(model => model.id === elementID);
      if (this.isClickingSelectedItem(elementID)) {
        if (event.ctrlKey) {
          const selectedIndex = this.workAreaService.selectedItems.indexOf(selectedItem);
          this.workAreaService.selectedItems.splice(selectedIndex, 1);
        }
      } else {
        if (event.ctrlKey) {
          this.workAreaService.selectedItems.push(selectedItem);
        } else {
          this.workAreaService.selectedItems = [selectedItem];
        }
      }
    }
  }

  private isClickingSelectedItem(clickedID): boolean {
    return this.workAreaService.selectedItems.map(item => item.id).includes(clickedID);
  }

  private addImage(x, y, width, height) {
    const image = new PositionedImage();
    image.source = 'assets/images/koala.jpg';
    image.x = x;
    image.y = y;
    image.width = width;
    image.height = height;
    // For now, just setting the id to the index, this will most likely come from the db ?
    image.id = this.workAreaService.positionedElementModels.length;
    this.workAreaService.positionedElementModels.push(image);
  }

  private addLabel(x, y, width, height) {
    const label = new PositionedLabel();
    label.text = 'test label';
    label.x = x;
    label.y = y;
    label.width = width;
    label.height = height;
    // For now, just setting the id to the index, this will most likely come from the db ?
    label.id = this.workAreaService.positionedElementModels.length;
    this.workAreaService.positionedElementModels.push(label);
  }

  private getMousePositionRelativeToWorkspace(event: any) {
    const workspaceRectangle = this.containerElement.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - workspaceRectangle.left,
      y: event.clientY - workspaceRectangle.top,
    }
  }

  private createMultiSelection(selectionX, selectionY, selectionWidth, selectionHeight) {
    const selectionBottom = selectionY + selectionHeight;
    const selectionRight = selectionX + selectionWidth;

    this.workAreaService.selectedItems = this.workAreaService.positionedElementModels.filter(model => {
      return model.x < selectionRight && model.right > selectionX &&
             model.y < selectionBottom && model.bottom > selectionY;
    });
  }

}
