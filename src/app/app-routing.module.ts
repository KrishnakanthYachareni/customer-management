import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './customers/customers/customers.component';
import {OrdersComponent} from './orders/orders/orders.component';
import {AboutComponent} from './about/about/about.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/customers'},
  {path: 'customers', component: CustomersComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/customers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
