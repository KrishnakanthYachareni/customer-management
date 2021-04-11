import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {OrdersComponent} from './orders/orders.component';
import {AboutComponent} from './about/about.component';
import {CustomerOrdersComponent} from './customers/customer-orders/customer-orders.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/customers'},
  {path: 'customers', component: CustomersComponent},
  {path: 'customers/:id/orders', component: CustomerOrdersComponent},
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
