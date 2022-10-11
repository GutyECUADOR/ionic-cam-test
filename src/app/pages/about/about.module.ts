import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about';
import { PopoverPage } from '../about-popover/about-popover';
import { AboutPageRoutingModule } from './about-routing.module';
import { AreaChartComponent } from 'src/app/components/area-chart/area-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [AboutPage, PopoverPage, AreaChartComponent],
  entryComponents: [PopoverPage],
  bootstrap: [AboutPage],
})
export class AboutModule {}
