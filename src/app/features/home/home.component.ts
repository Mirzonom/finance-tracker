import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../core/services/transaction.service';
import {DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  balance = 0;
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

      this.balance = this.income - this.expense;
    });
  }
}
