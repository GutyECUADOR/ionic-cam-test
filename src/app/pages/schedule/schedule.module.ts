import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SchedulePage } from './schedule';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CircleChartComponent } from 'src/app/components/circle-chart/circle-chart.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    NgApexchartsModule,
  ],
  declarations: [
    SchedulePage,
    ScheduleFilterPage,
    CircleChartComponent
  ],
  entryComponents: [
    ScheduleFilterPage
  ]
})
export class ScheduleModule { }
