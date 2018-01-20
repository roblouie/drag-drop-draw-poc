import {Component, ElementRef, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import { PositionedImage } from './test-models/positioned-image.model';

@Component({
  selector: 'positioned-image',
  template: `<div id="{{image.id}}" [ngStyle]="{
      'background-image': 'url('+image.source+')',
      'left': image.x+'px',
      'top': image.y+'px',
      'width': image.width+'px',
      'height': image.height+'px'
    }"
    [ngClass]="{'selected': isSelected, 'anchor': isAnchor}"
  >`,
  styles: [
    `
      div {
        position: absolute;
        border: 1px dashed gray;
        background-repeat: no-repeat;
      }

      .selected {
        border: 2px solid blue;
        cursor: move;
      }

      .selected:active {
          cursor: move;
      }

      .anchor {
          border-color: red;
      }
    `
  ]
})
export class PositionedImageComponent implements OnInit {
  @Input() image: PositionedImage;
  @Input() isSelected: boolean;
  @Input() isAnchor: boolean;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}


}
