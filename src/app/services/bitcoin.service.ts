import{Injectable} from '@angular/core';
import { Http } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import{ Observable } from 'rxjs/Rx';
import * as moment from 'moment'; 

@Injectable()
export class BitcoinService {

    constructor(private http: Http){

    }
    public getCurrentValue(){
        //this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        
        return this.http.get('https://blockchain.info/ticker')
        .map(res => res.json());
        
    }

    public getHistoric(){
        let now = moment(); // add this 2 of 4
        let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + now.subtract(30, 'days') + '&end='
          + now;
        let url2 = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-10-01&end=2017-10-26';
        console.log(url);
        return this.http.get(url2)
        .map(res => res.json());
    }
}
