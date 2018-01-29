import {Component, ElementRef, OnInit, Input, Renderer2} from '@angular/core';
import { PositionedImage } from './positioned-image.model';

@Component({
  selector: 'positioned-image',
  template: `<div id="{{image.id}}" [ngStyle]="{
      'background-image': 'url('+imageSource+')',
      'left': image.x+'px',
      'top': image.y+'px',
      'width': image.width+'px',
      'height': image.height+'px'
    }"></div>`,
  styles: [
    `
      div {
        position: absolute;
        background-repeat: no-repeat;
      }
    `
  ]
})
export class PositionedImageComponent implements OnInit {
  @Input() image: PositionedImage;
  imageSource = require('./koala.jpg');

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}


}
