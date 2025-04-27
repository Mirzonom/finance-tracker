import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../core/models/transaction.model';
import {TransactionService} from '../../core/services/transaction.service';
import {NgForOf} from '@angular/common';
import {TransactionItemComponent} from '../../shared/components/transaction-item/transaction-item.component';

@Component({
  selector: 'app-transaction-history',
  imports: [
    NgForOf,
    TransactionItemComponent
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions;
    });
  }
}
