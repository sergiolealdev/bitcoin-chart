import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { BitcoinService } from './services/bitcoin.service';
import {SpinnerComponent} from "./commons/spinner/spinner";


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule
  ],
  providers: [BitcoinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
