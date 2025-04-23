import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {TransactionFormComponent} from './features/transaction-form/transaction-form.component';
import {TransactionHistoryComponent} from './features/transaction-history/transaction-history.component';
import {StatisticsComponent} from './features/statistics/statistics.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'transaction-form', component: TransactionFormComponent},
  {path: 'transaction-history', component: TransactionHistoryComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
