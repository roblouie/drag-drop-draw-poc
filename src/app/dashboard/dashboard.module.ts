import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DragDropDraw2Module } from '../drag-drop-draw-2/drag-drop-draw-2.module';
import { FormatToolbarModule } from '../format-toolbar/format-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
    ExamplesModule,
    DragDropDraw2Module,
    FormatToolbarModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
