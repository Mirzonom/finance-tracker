import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionService} from '../../core/services/transaction.service';
import {SelectComponent} from '../../shared/components/select/select.component';
import {InputComponent} from '../../shared/components/input/input.component';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  transactionForm: FormGroup;

  transactionTypes = [
    {label: 'Доход', value: 'income'},
    {label: 'Расход', value: 'expense'}
  ];

  categories = [
    {label: 'Работа', value: 'work'},
    {label: 'Еда', value: 'food'},
    {label: 'Транспорт', value: 'transport'},
    {label: 'Другое', value: 'other'}
  ];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      type: ['income', Validators.required],
      categoryId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value);
      this.router.navigate(['/transaction-history']);
    }
  }
}
