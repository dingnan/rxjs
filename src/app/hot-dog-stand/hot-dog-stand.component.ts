import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, zip } from 'rxjs';
import { tap } from 'rxjs/operators';

type Hotdog = ['hot dog bun', 'sausage', 'onion', 'ketchup'];

@Component({
  selector: 'hot-dog-stand',
  templateUrl: './hot-dog-stand.component.html',
  styleUrls: ['./hot-dog-stand.component.scss']
})
export class HotDogStandComponent implements OnInit {
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