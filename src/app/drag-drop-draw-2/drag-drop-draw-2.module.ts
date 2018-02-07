import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkAreaComponent } from './work-area/work-area.component';
import { PositionedImageComponent } from './positioned-elements/positioned-image.component';
import { PositionedLabelComponent } from './positioned-elements/positioned-label.component';
import { PositionedElementService } from './positioned-element.service';
import { AlignmentService } from './alignment.service';
import { SizingService } from './sizing.service';
import { SpacingService } from './spacing.service';
import { SelectableDirective } from './selectable/selectable.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    WorkAreaComponent,
    PositionedImageComponent,
    PositionedLabelComponent,
    SelectableDirective,
  ],
  exports: [
    WorkAreaComponent,
    PositionedImageComponent,
    PositionedLabelComponent,
  ],
  entryComponents: [],
  providers: [
    PositionedElementService,
    AlignmentService,
    SizingService,
    SpacingService,
  ],
})
export class DragDropDraw2Module {}
