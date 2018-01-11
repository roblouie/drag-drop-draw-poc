import {Component, ElementRef, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import { PositionedImage } from './test-models/positioned-image.model';

@Component({
  selector: 'positioned-image',
  template: `<img src="{{image.source}}" [ngStyle]="{'left': image.x+'px', 'top': image.y+'px'}">`,
  styles: [
    `
      img {
        position: absolute;
      }
    `
  ]
})
export class PositionedImageComponent implements OnInit {
  @Input() image: PositionedImage;

  constructor(private elRef:ElementRef, private renderer:Renderer2) {}

  ngOnInit():void {}


}
