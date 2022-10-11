import { Component, ViewChild } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { PopoverController } from '@ionic/angular';

import { PopoverPage } from '../about-popover/about-popover';
import { IUser } from './../../interfaces/user.interface';
import { environment } from '../../../environments/environment';
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
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  location = 'madison';
  user: IUser;
  token:string;
  exchangeLabels:string[];
  exchangeValues:any[];

  constructor(public popoverCtrl: PopoverController,  public userData: UserData) {
    userData.getUser().then( data => {
      this.user = data.user;
    });

    userData.getToken().then( token => {
      this.token = token;
    });

    
   }

  async ngOnInit() {
    await this.getExchangerates();
    
  }

  showGrafica(){
    this.chartOptions = {
      series: [
        {
          name: "USD/ARS",
          data: this.exchangeValues
        }
      ],
      chart: {
        type: "area",
        height: 250,
        width: 370,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      labels: this.exchangeLabels,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: false
      },
    };
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }

  async getExchangerates(){
    let myHeaders = new Headers();
    myHeaders.append("apikey", "dwa0lc8QdIp2ipTokQgi3LHVfAW3Uz7d");
    
    fetch("https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-09-11&end_date=2022-10-11&base=USD&symbols=EUR,ARS", {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    })
    .then(response => response.json())
    .then(result => {
      const ratesArrays = result.rates;
      
        this.exchangeLabels = Object.keys(ratesArrays)
        this.exchangeValues = Object.values(ratesArrays).map( rate =>{
          return rate['ARS'].toFixed(2);
        })
      console.log(this.exchangeLabels)
      console.log(this.exchangeValues)
      this.showGrafica()
    })
    .catch(error => console.log('error', error));

  }

  openSocial(){
    let phone = environment.phone;
    console.log('Open Whatsapp');
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=Necesito soporte sobre..."`, "_blank");
  }
}
