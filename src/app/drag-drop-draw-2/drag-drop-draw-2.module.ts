import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    WorkAreaDirective,
    WorkAreaComponent,
    TestComponent,
  ],
  exports: [
    WorkAreaDirective,
    WorkAreaComponent,
    TestComponent,
  ],
  entryComponents: [
    TestComponent,
  ]
})
export class DragDropDraw2Module {}
