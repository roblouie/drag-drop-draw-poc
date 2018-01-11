import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-test-component',
  template: '<p>HERE IS MY COMPONENT</p>',
  styles: [`      
    :host {
        position: absolute;
        width: 200px;
    }
  `]
})
export class TestComponent {

}
