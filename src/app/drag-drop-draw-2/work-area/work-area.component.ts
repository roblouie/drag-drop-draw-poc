import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PositionedImage } from '../positioned-elements/positioned-image.model';
import { PositionedElement } from '../positioned-elements/positioned-element.model';
import { PositionedLabel } from '../positioned-elements/positioned-label.model';
import { Point } from '../../shared/geometry/point.model';
import { PositionedElementService } from '../positioned-element.service';
import { ItemSnapService } from '../item-snap.service';
import { Rectangle } from '../../shared/geometry/rectangle.model';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.html',
  styleUrls: ['./work-area.scss'],
  providers: [ItemSnapService],
})
export class WorkAreaComponent implements OnInit {
  @ViewChild('container') private containerElement: ElementRef;
  readonly mouseButtons = { left: 0, middle: 1, right: 2 };
  currentTool = 'image';
  startingPosition;
  isDrawing = false;
  isMoving = false;
  isResizing = false;
  dragHandle: string;
  dragBox;

  constructor(
    private renderer: Renderer2,
    private positionedElementService: PositionedElementService,
    private itemSnapService: ItemSnapService
  ) {}

  ngOnInit() {
    this.disableDefaultContextMenu();
    this.setSnapLineClass();
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
    if (event.button === this.mouseButtons.right) {
      return false;
    }

    if (this.isDrawing) {
      const endingPosition = this.getMousePositionRelativeToWorkspace(event);
      const drawnRectangle = Rectangle.fromPoints(this.startingPosition, endingPosition);

      // set width and height to default minimum if the user just clicked or barely dragged
      if (this.currentTool !== 'select' && drawnRectangle.width <= 2 && drawnRectangle.height <= 2) {
        drawnRectangle.width = 100;
        drawnRectangle.height = 50;
      }

      switch (this.currentTool) {
        case 'select':
          this.createMultiSelection(drawnRectangle, event.ctrlKey);
          break;
        case 'image':
          this.addImage(drawnRectangle);
          break;
        case 'label':
          this.addLabel(drawnRectangle);
          break;
      }
      this.isDrawing = false;
      this.renderer.removeChild(this.containerElement.nativeElement, this.dragBox);
    }

    this.isResizing = false;
    this.isMoving = false;
    this.startingPosition = null;
    this.clearSnapLines();
  }

  onMouseMove(event: any) {
    // TODO: Clean this up, it's gotten way out of hand, needs split into private functions at the very least
    const currentPosition = this.getMousePositionRelativeToWorkspace(event);

    if (this.isDrawing) {
      this.updateDragboxSizeAndPosition(this.dragBox, currentPosition, this.startingPosition);
    } else if (this.isMoving) {
      const distance = new Point(currentPosition.x - this.startingPosition.x, currentPosition.y - this.startingPosition.y);
      this.positionedElementService.getSelectedElements().forEach(item => {
        item.x += distance.x;
        item.y += distance.y;
      });
      this.startingPosition = currentPosition;
    } else if (this.isResizing) {

      // TODO: Refactor this, possibly to the sizing service, also fix the bug where if the item gets too small it can't be made large again
      // Note: Probably fix size bug by checking proposed new size, and if smaller than the limit, set to the limit
      if (this.dragHandle === 'top-left') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.width > 10) {
            item.x += currentPosition.x - this.startingPosition.x;
            item.width += this.startingPosition.x - currentPosition.x;
          }
          if (item.height > 10) {
            item.y += currentPosition.y - this.startingPosition.y;
            item.height += this.startingPosition.y - currentPosition.y;
          }
        });

      } else if (this.dragHandle === 'top-center') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.height > 10) {
            item.y += currentPosition.y - this.startingPosition.y;
            item.height += this.startingPosition.y - currentPosition.y;
          }
        });

      } else if (this.dragHandle === 'top-right') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.width > 10) {
            item.width += currentPosition.x - this.startingPosition.x;
          }
          if (item.height > 10) {
            item.y += currentPosition.y - this.startingPosition.y;
            item.height += this.startingPosition.y - currentPosition.y;
          }
        });

      } else if (this.dragHandle === 'center-left') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.width > 10) {
            item.x += currentPosition.x - this.startingPosition.x;
            item.width += this.startingPosition.x - currentPosition.x;
          }
        });

      } else if (this.dragHandle === 'center-right') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.width > 10) {
            item.width += currentPosition.x - this.startingPosition.x;
          }
        });

      } else if (this.dragHandle === 'bottom-left') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.width > 10) {
            item.x += currentPosition.x - this.startingPosition.x;
            item.width += this.startingPosition.x - currentPosition.x;
          }
          if (item.height > 10) {
            item.height += currentPosition.y - this.startingPosition.y;
          }
        });

      } else if (this.dragHandle === 'bottom-center') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.height > 10) {
            item.height += currentPosition.y - this.startingPosition.y;
          }
        });

      } else if (this.dragHandle === 'bottom-right') {
        this.positionedElementService.getSelectedElements().forEach(item => {
          if (item.width > 10) {
            item.width += currentPosition.x - this.startingPosition.x;
          }
          if (item.height > 10) {
            item.height += currentPosition.y - this.startingPosition.y;
          }
        });
      }

      this.startingPosition = currentPosition;
    }

    if (this.shouldSnap()) {
      this.itemSnapService.checkAlignment(currentPosition);
      this.drawSnapLines();
    }
  }

  onMouseDown(event: any) {
    const clickedElementID: string = event.target.id;
    const elementID: number = Number(clickedElementID);
    const isClickingEmptyWorkspaceArea = clickedElementID === 'work-area';
    this.startingPosition = this.getMousePositionRelativeToWorkspace(event);

    // TODO: Update logic for right mouse button down. Right button can only select a single item on mouse-down, it can't move items or
    // select multiple. Remaining right click handling happens on mouseUp, where the context menu is opened.

    if (isClickingEmptyWorkspaceArea) {
      this.isDrawing = true;
      this.renderer.setStyle(this.dragBox, 'top', `${this.startingPosition.y}px`);
      this.renderer.setStyle(this.dragBox, 'left', `${this.startingPosition.x}px`);
      this.renderer.setStyle(this.dragBox, 'height', `0px`);
      this.renderer.setStyle(this.dragBox, 'width', `0px`);

      this.renderer.appendChild(this.containerElement.nativeElement, this.dragBox);
    } else if (event.target.classList.contains('resize-handle')) {
      this.isResizing = true;
      const handleElementId = Number(event.target.dataset.controlId);
      this.positionedElementService.setReferenceElementById(handleElementId);
      if (event.target.classList.contains('top-left')) {
        this.dragHandle = 'top-left';
      } else if (event.target.classList.contains('top-center')) {
        this.dragHandle = 'top-center';
      } else if (event.target.classList.contains('top-right')) {
        this.dragHandle = 'top-right';
      } else if (event.target.classList.contains('center-left')) {
        this.dragHandle = 'center-left';
      } else if (event.target.classList.contains('center-right')) {
        this.dragHandle = 'center-right';
      } else if (event.target.classList.contains('bottom-left')) {
        this.dragHandle = 'bottom-left';
      } else if (event.target.classList.contains('bottom-center')) {
        this.dragHandle = 'bottom-center';
      } else if (event.target.classList.contains('bottom-right')) {
        this.dragHandle = 'bottom-right';
      }
    } else {
      this.isMoving = true;

      const selectedItem = this.positionedElementService.positionedElementModels.find(model => model.id === elementID);
      if (this.isClickingSelectedItem(elementID)) {
        if (event.ctrlKey) {
          this.positionedElementService.removeElementFromSelection(selectedItem);
        } else {
          this.positionedElementService.setReferenceElement(selectedItem);
        }
      } else {
        if (event.ctrlKey) {
          this.positionedElementService.addElementToSelection(selectedItem);
        } else {
          this.positionedElementService.setSelectedElements([selectedItem]);
        }
      }
    }

    if (this.shouldSnap()) {
      this.itemSnapService.setupAlignmentCheck();
      this.drawSnapLines();
    }
  }

  private isClickingSelectedItem(clickedID): boolean {
    return this.positionedElementService.getSelectedElements().map(item => item.id).includes(clickedID);
  }

  private addImage(boundingRect: Rectangle) {
    const image = new PositionedImage();
    image.source = 'assets/images/koala.jpg';
    image.x = boundingRect.left;
    image.y = boundingRect.top;
    image.width = boundingRect.width;
    image.height = boundingRect.height;
    // For now, just setting the id to the index, this will most likely come from the db ?
    image.id = this.positionedElementService.positionedElementModels.length;
    this.positionedElementService.positionedElementModels.push(image);
  }

  private addLabel(boundingRect: Rectangle) {
    const label = new PositionedLabel();
    label.text = 'test label';
    label.x = boundingRect.left;
    label.y = boundingRect.top;
    label.width = boundingRect.width;
    label.height = boundingRect.height;
    // For now, just setting the id to the index, this will most likely come from the db ?
    label.id = this.positionedElementService.positionedElementModels.length;
    this.positionedElementService.positionedElementModels.push(label);
  }

  private getMousePositionRelativeToWorkspace(event: any) {
    const workspaceRectangle = this.containerElement.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - workspaceRectangle.left,
      y: event.clientY - workspaceRectangle.top,
    }
  }

  private createMultiSelection(selection: Rectangle, shouldAdd) {
    const selectedItems = this.positionedElementService.positionedElementModels.filter(model => {
      return selection.isIntersecting(model.boundingRectangle);
    });

    if (shouldAdd) {
      this.positionedElementService.addElementsToSelection(selectedItems);
    } else {
      this.positionedElementService.setSelectedElements(selectedItems);
    }
  }

  private drawSnapLines() {
    Object.keys(this.itemSnapService.snapLines).forEach(key => {
      const lineData = this.itemSnapService.snapLines[key];
      if (lineData.from === null && lineData.to === null) {
        this.renderer.removeChild(this.containerElement.nativeElement, lineData.element);
      } else {
        const width = Math.abs(lineData.from.x - lineData.to.x);
        const height = Math.abs(lineData.from.y - lineData.to.y);
        this.renderer.setStyle(lineData.element, 'top', `${lineData.from.y}px`);
        this.renderer.setStyle(lineData.element, 'left', `${lineData.from.x}px`);
        this.renderer.setStyle(lineData.element, 'height', `${height}px`);
        this.renderer.setStyle(lineData.element, 'width', `${width}px`);
        this.renderer.appendChild(this.containerElement.nativeElement, lineData.element);
      }
    });
  }

  private setSnapLineClass() {
    Object.keys(this.itemSnapService.snapLines).forEach(key => {
      this.renderer.addClass(this.itemSnapService.snapLines[key].element, 'snap-line');
    })
  }

  private clearSnapLines() {
    Object.keys(this.itemSnapService.snapLines).forEach(key => {
      const lineData = this.itemSnapService.snapLines[key];
      this.renderer.removeChild(this.containerElement.nativeElement, lineData.element);
    });
  }

  private updateDragboxSizeAndPosition(dragBox: any, currentPosition: Point, startingPosition) {
    const dragBoxRectangle = Rectangle.fromPoints(currentPosition, startingPosition);
    this.renderer.setStyle(dragBox, 'top', `${dragBoxRectangle.top}px`);
    this.renderer.setStyle(dragBox, 'left', `${dragBoxRectangle.left}px`);
    this.renderer.setStyle(dragBox, 'height', `${dragBoxRectangle.height}px`);
    this.renderer.setStyle(dragBox, 'width', `${dragBoxRectangle.width}px`);
  }

  private disableDefaultContextMenu() {
    this.containerElement.nativeElement.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }, false);
  }

  private shouldSnap() {
    const isDrawingElement = this.isDrawing && this.currentTool !== 'select';
    return isDrawingElement || this.isMoving || this.isResizing;
  }
}
