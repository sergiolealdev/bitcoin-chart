import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: Http) {

  }

  ngOnInit() {
    const source = Rx.Observable
      .interval(5 * 1000 /* ms */)
      .timeInterval();

    const myarray: any[] = [];
    const arrayValues: any[] = [];

    const subscription = source.subscribe(val => {

      this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .map(res => res.json())
        .subscribe(
          (data) => {
            console.log("val:" + val.value);
            myarray.push(val.value + "");

            const _lineChartData: Array<any> = new Array(val.value + 1);
            arrayValues.push(parseFloat(data.bpi.USD.rate.replace(",", "")));
            const date = new Date();
            _lineChartData[0] = {data: new Array(val.value + 1), label: "USD/BitCoin " + date.toDateString()};
            for (let i = 0; i < arrayValues.length; i++) {
              _lineChartData[0].data[i] = arrayValues[i];
            }
            this.lineChartData = _lineChartData;

            this.lineChartLabels.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

            console.log(this.lineChartData);
            console.log(this.lineChartLabels);
          }
        );
    });
  }

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'red',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartOptions: any = {
    responsive: false
  };

  //Chart Labels
  public lineChartLabels: string[] = [];
  public lineChartType = 'line';
  public lineChartLegend = true;

  //Chart data
  public lineChartData: Array<any> = [
    {
      data: [],
      label: ""
    }
  ];

  // Chart events
  public chartClicked(e: any): void {
    console.log(e);
  }

  // Chart events
  public chartHovered(e: any): void {
    console.log(e);
  }


}
