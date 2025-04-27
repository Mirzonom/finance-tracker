import {Injectable} from '@angular/core';
import {TransactionService} from './transaction.service';
import {ExpenseByCategory, MonthlySummary} from '../models/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private transactionService: TransactionService) {
  }

  getExpensesByCategory(): ExpenseByCategory[] {
    const transactions = this.transactionService.transactionsSubject.getValue();
    const expenseTransactions = transactions.filter(tx => tx.type === 'expense');

    const result: { [key: string]: ExpenseByCategory } = {};

    for (const tx of expenseTransactions) {
      if (!result[tx.categoryId]) {
        result[tx.categoryId] = {categoryName: tx.categoryId, totalAmount: 0, color: this.randomColor()};
      }
      result[tx.categoryId].totalAmount += tx.amount;
    }

    return Object.values(result);
  }

  getMonthlySummary(): MonthlySummary[] {
    const transactions = this.transactionService.transactionsSubject.getValue();
    const summary: { [key: string]: MonthlySummary } = {};

    for (const tx of transactions) {
      const month = new Date(tx.date).toLocaleString('default', {month: 'long'});
      if (!summary[month]) {
        summary[month] = {month, income: 0, expenses: 0};
      }
      if (tx.type === 'income') {
        summary[month].income += tx.amount;
      } else {
        summary[month].expenses += tx.amount;
      }
    }

    return Object.values(summary);
  }

  private randomColor(): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
