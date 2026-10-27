import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private _count = signal(0);
  readonly count = this._count.asReadonly();
  handleDecrement() {
    this._count.update((i) => i - 1);
  }
  handleIncrement() {
    this._count.update((i) => i + 1);
  }
}
