import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, zip } from 'rxjs';
import { tap } from 'rxjs/operators';

interface HotdogBog {
  customerId: number;
  product: Hotdog;
}

type Hotdog = ['hot dog bun', 'sausage', 'onion', 'ketchup'];

@Component({
  selector: 'hot-dog-shop',
  templateUrl: './hot-dog-shop.component.html',
  styleUrls: ['./hot-dog-shop.component.scss']
})
export class HotDogShopComponent implements OnInit {
  hotdog$: Observable<Hotdog>;
  bun$ = new Subject<'hot dog bun'>();
  sausage$ = new Subject<'sausage'>();
  onion$ = new Subject<'onion'>();
  ketchup$ = new Subject<'ketchup'>();

  ngOnInit() {
    this.hotdog$ = zip(this.bun$, this.sausage$, this.onion$, this.ketchup$)
      .pipe(tap(v => console.log('Enjoy! ', v)));
    // this.hotdog$ = combineLatest([this.bun$, this.sausage$, this.onion$, this.ketchup$])
    //   .pipe(tap(v => console.log('Enjoy! ', v)));
  }
}