import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExamplesModule } from '../examples/examples.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    DashboardRoutingModule,
    ExamplesModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
