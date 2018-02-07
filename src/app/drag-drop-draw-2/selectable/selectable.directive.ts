import { Directive, ElementRef, Renderer2, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSelectable]',
})
export class SelectableDirective implements OnChanges, OnInit {
  @Input('isSelected') isSelected: boolean;
  @Input('isReferenceElement') isReferenceElement: boolean;
  @Input('selectableId') selectableId: number;
  handles = [
    {
      class: 'top-left',
      element: null,
    },
    {
      class: 'top-center',
      element: null,
    },
    {
      class: 'top-right',
      element: null,
    },
    {
      class: 'center-left',
      element: null,
    },
    {
      class: 'center-right',
      element: null,
    },
    {
      class: 'bottom-left',
      element: null,
    },
    {
      class: 'bottom-center',
      element: null,
    },
    {
      class: 'bottom-right',
      element: null,
    },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.handles.forEach(handle => {
      handle.element = this.renderer.createElement('div');
      handle.element.dataset.controlId = this.selectableId;
      handle.element.setAttribute('data-control-id', this.selectableId);
      this.renderer.addClass(handle.element, 'resize-handle');
      this.renderer.addClass(handle.element, handle.class);
      this.renderer.appendChild(this.el.nativeElement.firstChild, handle.element);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isReferenceElement) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'reference-element');
    } else {
      this.renderer.removeClass(this.el.nativeElement.firstChild, 'reference-element');
    }

    if (this.isSelected) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'selected');
    } else {
      this.renderer.removeClass(this.el.nativeElement.firstChild, 'selected');
    }
  }

}
