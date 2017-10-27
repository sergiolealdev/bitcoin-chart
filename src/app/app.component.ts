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
  constructor(private http: Http) {

  }

  ngOnInit() {
  var source = Rx.Observable
      .interval(1000 /* ms */)
      .timeInterval();

  var subscription = source.subscribe(
      function (x) {
          this.value2 = x.value;
          console.log("this.value2:",this.value2);
          console.log('Next: ' + x.toString());
          console.log(typeof x);
      },
      function (err) {
          console.log('Error: ' + err);
      },
      function () {
          console.log('Completed');
      });
    this.isLoading=true;
    this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .map(res => res.json())
      .subscribe(
        (data) => {
                this.data = data;
                this.isLoading=false;
            }
        );
  }

}
