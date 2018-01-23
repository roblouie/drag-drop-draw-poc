import {Component, ElementRef, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import { PositionedLabel } from './positioned-label.model';

@Component({
  selector: 'positioned-label',
  template: `<div id="{{label.id}}" [ngStyle]="{'left': label.x+'px', 'top': label.y+'px', 'width': label.width+'px', 'height': label.height+'px'}" [ngClass]="{'selected': isSelected, 'anchor': isAnchor}">{{label.text}}</div>`,
  styles: [
    `
      div {
        position: absolute;
      }
    `
  ]
})
export class PositionedLabelComponent implements OnInit {
  @Input() label: PositionedLabel;
  @Input() isSelected: boolean;
  @Input() isAnchor: boolean;

  constructor(private elRef:ElementRef, private renderer:Renderer2) {}

  ngOnInit():void {}


}
