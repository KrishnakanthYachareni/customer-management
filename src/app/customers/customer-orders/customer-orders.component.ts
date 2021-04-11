import {Component, OnInit} from '@angular/core';
import {ICustomer, IOrder} from '../../shared/interfaces';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html'
})
export class CustomerOrdersComponent implements OnInit {

  orders: IOrder[] = [];
  // @ts-ignore
  customer: ICustomer;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.route.parent.params.subscribe(() => {
      const id: number = Number(this.route.snapshot.paramMap.get('id'));
      this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
          this.customer = customer;
        });
    });
  }

  ordersTrackBy(index: number, orderItem: any): number {
    return index;
  }

}
