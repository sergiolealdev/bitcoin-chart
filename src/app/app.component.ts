import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../app/services/bitcoin.service';
import 'rxjs/add/operator/map';

import * as Rx from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  timer: number = 5 * 1000;/* ms */
  arrayValues: any[] = [];
  currentValue: any;
  variation: any;
  positiveVariation:boolean;
  constructor(private bitcoinService: BitcoinService) {
    this.positiveVariation = true;
  }

  ngOnInit() {
    this.getHistoric();
    this.getCurrent();
  }

  private getCurrent() {
    const source = Rx.Observable
      .interval(this.timer)
      .timeInterval();

    const subscription = source.subscribe(val => {
      this.bitcoinService.getCurrentValue().subscribe(data => {
        this.updateChart(data, val);
        this.updateBpiValue(data);
      });

    });


  }

  private getHistoric() {
    this.bitcoinService.getHistoric().subscribe(
      (data) => {
        /*const _lineChartData: Array<any> = new Array(val.value + 1);
        arrayValues.push(parseFloat(data.bpi.USD.rate.replace(",", "")));
        const date = new Date();
        _lineChartData[0] = {data: new Array(val.value + 1), label: "BitCoin/USD  " + date.toDateString()};
        for (let i = 0; i < arrayValues.length; i++) {
          _lineChartData[0].data[i] = arrayValues[i];
        }
        this.lineChartData = _lineChartData;

        this.lineChartLabels.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
        */
        //        console.log("££££££££££££££££££££££££££££££££££££££££££££££££££££££");
        //        console.log(data.bpi);
      }
    );
  }

  private updateChart(data: any, val: any) {
    const _lineChartData: Array<any> = new Array(val.value + 1);
    this.arrayValues.push(this.getFloatValue(data));
    const date = new Date();
    _lineChartData[0] = { data: new Array(val.value + 1), label: "BitCoin/USD  " + date.toDateString() };
    for (let i = 0; i < this.arrayValues.length; i++) {
      _lineChartData[0].data[i] = this.arrayValues[i];
    }
    this.lineChartData = _lineChartData;

    this.lineChartLabels.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
  }

  private updateBpiValue(data: any) {
    this.currentValue = this.getFloatValue(data);
    var lastValue = this.arrayValues[this.arrayValues.length - 2];
    var change = this.currentValue / lastValue;
    if (change !== 1) {
      this.variation = change;
    }
  }

  private getFloatValue(data: any) {
    return parseFloat(data.USD.last)
  }

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: '#DD5A3E',
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
    //    console.log(e);
  }

  // Chart events
  public chartHovered(e: any): void {
    //    console.log(e);
  }


}
