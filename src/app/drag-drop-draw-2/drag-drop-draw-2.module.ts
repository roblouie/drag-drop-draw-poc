import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkAreaComponent } from "./work-area.component";
import { PositionedImageComponent } from "./positioned-image.component";
import { PositionedLabelComponent } from "./positioned-label.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    WorkAreaComponent,
    PositionedImageComponent,
    PositionedLabelComponent,
  ],
  exports: [
    WorkAreaComponent,
    PositionedImageComponent,
    PositionedLabelComponent,
  ],
  entryComponents: [

  ]
})
export class DragDropDraw2Module {}
