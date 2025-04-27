import {Component} from '@angular/core';
import {TransactionService} from '../../core/services/transaction.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [
    DecimalPipe
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  income = 0;
  expense = 0;

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transactions => {
      this.income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      this.expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    });
  }
}
