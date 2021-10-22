import { Component, OnInit } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import { map, mergeMap, switchMap, concatMap, exhaustMap, take, tap } from 'rxjs/operators';

interface Order {
  orderId: number;
  count: number;
}

interface HotdogBag {
  customerId: number;
  hotdog: Hotdog;
}

type Hotdog = ['hot dog bun', 'sausage', 'onion', 'ketchup'];

@Component({
  selector: 'hot-dog-shop',
  templateUrl: './hot-dog-shop.component.html',
  styleUrls: ['./hot-dog-shop.component.scss']
})
export class HotDogShopComponent implements OnInit {
  order$ = new Subject<Order>();
  currentOrder$ = new Subject<number>();
  delivery$: Observable<HotdogBag>;
  bun$ = new Subject<'hot dog bun'>();
  sausage$ = new Subject<'sausage'>();
  onion$ = new Subject<'onion'>();
  ketchup$ = new Subject<'ketchup'>();

  _orderId = 0;

  ngOnInit() {
    this.delivery$ = this.order$.pipe(
      tap(v => console.log('Order! ', v)), 
      mergeMap(order => { //concatMap, switchMap, mergeMap, exhaustMap
        return zip(this.bun$.pipe(tap(() => this.currentOrder$.next(order.orderId))), this.sausage$, this.onion$, this.ketchup$)
          .pipe(
            map((hotdog: Hotdog) => {return {customerId: order.orderId, hotdog}}),
            take(order.count),
            tap(hotdog => console.log('Enjoy ! ', order, hotdog))
          )
      }));
  }

  placeOrder(amount: string) {
    const count = +amount;
    if (count > 0) {
      this.order$.next({orderId: this._orderId++, count})
    }
  }
}