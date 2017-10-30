import{Injectable} from '@angular/core';
import { Http } from '@angular/http';
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
        let url = 'https://api.coindesk.com/v1/bpi/historical/close.json';
        return this.http.get(url)
        .map(res => res.json());
    }
}
