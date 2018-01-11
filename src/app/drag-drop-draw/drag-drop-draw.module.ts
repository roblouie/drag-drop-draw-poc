import { NgModule } from '@angular/core';
import { WorkAreaDirective } from './work-area.directive';
import { WorkAreaComponent } from './work-area.component';
import { TestComponent } from './test.component';

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
export class DragDropDrawModule {}
