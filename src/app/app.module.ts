/*
This the main module of the app that has all the declarations, 
file imports etc which can be used in all other components of the app.
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersistenceModule } from 'angular-persistence';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { ProductListService } from './services/product-list.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2FilterPipeModule,
    FormsModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    PersistenceModule,
    AsyncLocalStorageModule
  ],
  providers: [ProductListService],
  bootstrap: [AppComponent]
})

export class AppModule { }
