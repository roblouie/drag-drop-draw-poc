import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgGridModule } from 'angular2-grid';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import {DragDropDrawModule} from '../drag-drop-draw/drag-drop-draw.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
    ExamplesModule,
    NgGridModule,
    DragDropDrawModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
