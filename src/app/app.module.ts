import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {CustomersComponent} from './customers/customers.component';
import {AboutComponent} from './about/about.component';
import {OrdersComponent} from './orders/orders.component';
import {DataService} from './services/data.service';
import {LoggerService} from './services/logger.service';
import {CustomersCardComponent} from './customers/customers-card/customers-card.component';
import {TrackByService} from './services/trackby.service';
import {CapitalizePipe} from './shared/pipes/capitalize.pipe';
import {TrimPipe} from './shared/pipes/trim.pipe';
import {HttpClientModule} from '@angular/common/http';
import {CustomerEditComponent} from './customers/customer-edit/customer-edit.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AboutComponent,
    OrdersComponent,
    CustomersCardComponent,
    CapitalizePipe,
    TrimPipe,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [DataService, LoggerService, TrackByService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
