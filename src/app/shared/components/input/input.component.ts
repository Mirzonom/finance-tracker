import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'date' = 'text';
  @Input() control: any;
}
