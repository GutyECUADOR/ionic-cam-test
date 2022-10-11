import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  
  constructor() { 

    
  }

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "STOCK ABC",
          data: [8107.85,
            8128.0,
            8122.9,
            8165.5,
            8340.7,
            8423.7,
            8423.5],
        }
      ],
      chart: {
        type: "area",
        height: 200,
        width: '300px',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
  
      labels: [ "13 Nov 2017",
                "14 Nov 2017",
                "15 Nov 2017",
                "16 Nov 2017",
                "17 Nov 2017",
                "20 Nov 2017",
                "21 Nov 2017",
                "22 Nov 2017"],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
    };

  }

}
