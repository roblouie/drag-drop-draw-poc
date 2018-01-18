import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkAreaComponent } from "./work-area.component";
import { PositionedImageComponent } from "./positioned-image.component";
import { PositionedLabelComponent } from "./positioned-label.component";
import {AlignmentToolsComponent} from "./alignment-tools/alignment-tools.component";
import { WorkAreaService } from './work-area.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    WorkAreaComponent,
    PositionedImageComponent,
    PositionedLabelComponent,
    AlignmentToolsComponent,
  ],
  exports: [
    WorkAreaComponent,
    PositionedImageComponent,
    PositionedLabelComponent,
    AlignmentToolsComponent,
  ],
  entryComponents: [],
  providers: [WorkAreaService]
})
export class DragDropDraw2Module {}
