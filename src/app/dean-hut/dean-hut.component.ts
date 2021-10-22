import { Component, OnInit } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

interface Order {
  customerId: number;
  count: number;
}

interface HotdogBag {
  customerId: number;
  hotdog: Hotdog;
}

type Hotdog = ['hot dog bun', 'sausage', 'onion', 'ketchup'];


@Component({
  selector: 'deans-hut',
  templateUrl: './dean-hut.component.html',
  styleUrls: ['./dean-hut.component.scss']
})
export class DeansHutComponent implements OnInit {
  order$ = new Subject<Order>();
  delivery$: Observable<Hotdog>;
  bun$ = new Subject<'hot dog bun'>();
  sausage$ = new Subject<'sausage'>();
  onion$ = new Subject<'onion'>();
  ketchup$ = new Subject<'ketchup'>();

  _customerId = 0;

  ngOnInit() {
    this.delivery$ = this.order$.pipe(
      tap(v => console.log('Order! ', v)), 
      switchMap(order => {
        return zip(this.bun$, this.sausage$, this.onion$, this.ketchup$)
          .pipe(tap(hotdog => console.log('Enjoy ! ', order, hotdog)))
      }));
  }

  placeOrder(type: string, amount: string) {
    const count = +amount;
    if (count > 0) {
      this.order$.next({customerId: this._customerId++, count})
    }
  }
}