export interface ExpenseByCategory {
  categoryName: string;
  totalAmount: number;
  color: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
}
