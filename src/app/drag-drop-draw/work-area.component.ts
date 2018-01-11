import {
  Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, Renderer2, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TestComponent } from './test.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-work-area',
  template: `
    <div #container
         (mousemove)="onMouseMove($event)" 
         (mousedown)="onMouseClick($event)" 
         style="width: 500px; height: 500px; background-color: blue; overflow: hidden; position: relative;">
      <ng-template #workarea></ng-template>
    </div>
  `
})
export class WorkAreaComponent implements OnInit {
  @ViewChild('workarea', {read: ViewContainerRef}) private workareaElement: ViewContainerRef;
  @ViewChild('container', {read: ViewContainerRef}) private containerElement: ViewContainerRef;

  components = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) { }

  onMouseMove(event: any) {
    // console.log(this.getMousePositionRelativeToWorkspace(event));
  }

  onMouseClick(event: any) {
    const positionData = this.getMousePositionRelativeToWorkspace(event);
    this.addComponent(positionData);
    console.log(this.getMousePositionRelativeToWorkspace(event));
  }

  addComponent(positionData) {
    // Create component dynamically inside the ng-template
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TestComponent);
    const component = this.workareaElement.createComponent(componentFactory);

    component.location.nativeElement.style['left'] = `${positionData.workspaceX}px`;
    component.location.nativeElement.style['top'] = `${positionData.workspaceY}px`;

    // This doesn't work, not fully sure why, I'm guessing since the component hasn't been rendered yet.
    // But using rendered is supposedly the more 'angular' way of doing this
    // this.renderer.setStyle(this.components[0].location.nativeElement, 'left', positionData.screenX);
    // this.renderer.setStyle(this.components[0].location.nativeElement, 'top', positionData.screenY);



    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  private getMousePositionRelativeToWorkspace(event: any) {
    const workspaceRectangle = this.containerElement.element.nativeElement.getBoundingClientRect();
    return {
      workspaceX: event.clientX - workspaceRectangle.left,
      workspaceY: event.clientY - workspaceRectangle.top,
      screenX: event.clientX,
      screenY: event.layerY
    }
  }

  ngOnInit() {
  }

}
