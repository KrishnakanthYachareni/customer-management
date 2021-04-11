import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {TrackByService} from '../services/trackby.service';
import {ICustomer, IPagedResults} from '../shared/interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  customers: ICustomer[] = [];
  totalRecords = 0;
  pageSize = 5;

  constructor(private dataService: DataService, public trackbyService: TrackByService) {
  }

  ngOnInit(): void {
    this.getCustomersPage(1);
  }

  pageChanged(page: number): void {
    this.getCustomersPage(page);
  }

  getCustomersPage(page: number): void {
    this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
      .subscribe((response: IPagedResults<ICustomer[]>) => {
        this.totalRecords = response.totalRecords;
        this.customers = response.results;
      });
  }

}
