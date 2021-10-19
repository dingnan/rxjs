import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HotDogStandComponent } from './hot-dog-stand/hot-dog-stand.component';
import { HotDogShopComponent } from './hot-dog-shop/hot-dog-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HotDogStandComponent,
    HotDogShopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
