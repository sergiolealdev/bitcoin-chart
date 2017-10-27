import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  isLoading:boolean;
  data:any;
  value2:any;
  oldData:any[] = [];
  constructor(private http: Http) {

  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: false
  };

  //Chart Labels
  public barChartLabels:string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  public barChartType = 'bar';
  public barChartLegend = true;

  //Chart data
  public barChartData:any[] = [
    {
      data: [66, 55, 83, 82, 56, 51, 43],
      label: 'Loss'
    },
    {
      data: [29, 38, 40, 21, 82, 30, 89],
      label: 'Profit'
    }
  ];

  // Chart events
  public chartClicked(e:any):void {
    console.log(e);
  }

  // Chart events
  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit() {
  const source = Rx.Observable
      .interval(60 *1000 /* ms */)
      .timeInterval();

   const subscription = source.subscribe(val => {
    this.isLoading=true;
    this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .map(res => res.json())
      .subscribe(
        (data) => {
          this.data = data;
          this.oldData.push(data.bpi.USD.rate);
          this.isLoading=false;
        }
      );
  });}

}
