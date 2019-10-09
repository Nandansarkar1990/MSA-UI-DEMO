import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import { BubbleChartComponent } from '../bubble-chart/bubble-chart.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    NgxChartsModule,
    DragDropModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ 
    DashboardComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    DonutChartComponent,
    BubbleChartComponent,
    ContextMenuComponent
  ]
})
export class DashboardModule { }
