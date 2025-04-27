import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Transaction} from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  addTransaction(transaction: Transaction): void {
    const current = this.transactionsSubject.getValue();
    this.transactionsSubject.next([...current, transaction]);
    this.saveToLocalStorage();
  }

  updateTransaction(updatedTransaction: Transaction): void {
    const current = this.transactionsSubject.getValue().map(tx =>
      tx.id === updatedTransaction.id ? updatedTransaction : tx
    );
    this.transactionsSubject.next(current);
    this.saveToLocalStorage();
  }

  deleteTransaction(id: string): void {
    const current = this.transactionsSubject.getValue().filter(tx => tx.id !== id);
    this.transactionsSubject.next(current);
    this.saveToLocalStorage();
  }

  filterByCategory(categoryId: string): Transaction[] {
    return this.transactionsSubject.getValue().filter(tx => tx.categoryId === categoryId);
  }

  filterByDateRange(startDate: Date, endDate: Date): Transaction[] {
    return this.transactionsSubject.getValue().filter(tx => {
      const date = new Date(tx.date);
      return date >= startDate && date <= endDate;
    });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactionsSubject.getValue()));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('transactions');
    if (data) {
      this.transactionsSubject.next(JSON.parse(data));
    }
  }
}
