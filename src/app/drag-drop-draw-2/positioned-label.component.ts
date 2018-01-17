import {Component, ElementRef, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import { PositionedLabel } from './test-models/positioned-label.model';

@Component({
  selector: 'positioned-label',
  template: `<div id="{{label.id}}" [ngStyle]="{'left': label.x+'px', 'top': label.y+'px', 'width': label.width+'px', 'height': label.height+'px'}" [ngClass]="{'selected': selected}">{{label.text}}</div>`,
  styles: [
    `
      div {
        position: absolute;
        border: 1px dashed gray;
      }

      .selected {
          border: 2px solid blue;
          cursor: move;
      }

      .selected:active {
          cursor: move;
      }
    `
  ]
})
export class PositionedLabelComponent implements OnInit {
  @Input() label: PositionedLabel;
  @Input() selected: boolean;

  constructor(private elRef:ElementRef, private renderer:Renderer2) {}

  ngOnInit():void {}


}
