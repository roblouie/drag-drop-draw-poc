import {
  Component, Directive, ElementRef, Renderer, EventEmitter, ComponentFactoryResolver, Host, ViewEncapsulation,
  Type, ComponentRef, KeyValueDiffer, KeyValueDiffers, OnInit, OnDestroy, DoCheck, ViewContainerRef, Output,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[rlWorkArea]',
  // inputs: ['config: ngGrid'],
  // host: {
  //   '(mousedown)': 'mouseDownEventHandler($event)',
  //   '(mousemove)': 'mouseMoveEventHandler($event)',
  //   '(mouseup)': 'mouseUpEventHandler($event)',
  //   '(touchstart)': 'mouseDownEventHandler($event)',
  //   '(touchmove)': 'mouseMoveEventHandler($event)',
  //   '(touchend)': 'mouseUpEventHandler($event)',
  //   '(window:resize)': 'resizeEventHandler($event)',
  //   '(document:mousemove)': 'mouseMoveEventHandler($event)',k
  //   '(document:mouseup)': 'mouseUpEventHandler($event)'
  // },
})
export class WorkAreaDirective {
  constructor(private element: ElementRef) {
    console.log('hey this works');
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    console.log(this.getMousePositionRelativeToWorkspace(event));
  }

  @HostListener('mousedown') onMouseDown(event) {
    console.log(event);
  }

  private getMousePositionRelativeToWorkspace(event: any) {
    const workspaceRectangle = this.element.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - workspaceRectangle.left,
      y: event.clientY - workspaceRectangle.top,
    }
  }
}
