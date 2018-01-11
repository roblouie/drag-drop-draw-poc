import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgGridModule } from 'angular2-grid';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DragDropDraw2Module } from '../drag-drop-draw-2/drag-drop-draw-2.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
    ExamplesModule,
    NgGridModule,
    DragDropDraw2Module,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
