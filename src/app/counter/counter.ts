import { Component, inject, signal } from '@angular/core';
import { CounterService } from '../counter-service';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  countService = inject(CounterService);
  handleDecrement() {
    this.countService.handleDecrement();
  }
  handleIncrement() {
    this.countService.handleIncrement();
  }
}
