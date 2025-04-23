import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from './features/home/home.component';
import {StatisticsComponent} from './features/statistics/statistics.component';
import {TransactionFormComponent} from './features/transaction-form/transaction-form.component';
import {TransactionHistoryComponent} from './features/transaction-history/transaction-history.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppComponent,
    BrowserModule,
    HomeComponent,
    StatisticsComponent,
    TransactionFormComponent,
    TransactionHistoryComponent
  ]
})
export class AppModule {
}
