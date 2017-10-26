import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  isLoading:boolean;
  data:any;
  constructor(private http: Http) {

  }

  ngOnInit() {
    console.log("Entramos");
    this.isLoading=true;
    this.http.get('https://s2k7tnzlhrpw.statuspage.io/api/v1/summary.json')
      .map(res => res.json())
      .subscribe(
        (data) => {
                this.data = data;
                this.isLoading=false;
            }
        );
  }

}
