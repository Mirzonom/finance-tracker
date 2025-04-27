import {Component, Input} from '@angular/core';
import {Transaction} from '../../../core/models/transaction.model';
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-transaction-item',
  imports: [
    NgClass,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
}
