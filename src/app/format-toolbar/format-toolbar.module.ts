import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizeToolsComponent } from './size-tools/size-tools.component';
import { SpacingToolsComponent } from './spacing-tools/spacing-tools.component';
import { AlignmentToolsComponent } from './alignment-tools/alignment-tools.component';
import { DragDropDraw2Module } from '../drag-drop-draw-2/drag-drop-draw-2.module';
import { PositionToolsComponent } from "./position-tools/position-tools.component";

@NgModule({
  imports: [
    CommonModule,
    DragDropDraw2Module,
  ],
  declarations: [
    AlignmentToolsComponent,
    SizeToolsComponent,
    SpacingToolsComponent,
    PositionToolsComponent,
  ],
  exports: [
    AlignmentToolsComponent,
    SizeToolsComponent,
    SpacingToolsComponent,
    PositionToolsComponent,
  ]
})
export class FormatToolbarModule { }
