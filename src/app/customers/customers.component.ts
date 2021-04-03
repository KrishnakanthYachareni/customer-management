import {Component, OnInit} from '@angular/core';
import {ICustomer, IPagedResults} from '../shared/interfaces';
import {DataService} from '../services/data.service';
import {LoggerService} from '../services/logger.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  title: string;
  filterText: string;
  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];
  totalRecords = 0;
  pageSize = 10;

  constructor(private dataService: DataService, private logger: LoggerService) {
    this.title = 'Customers';
    this.filterText = 'Filter Customers:';
  }

  ngOnInit(): void {
    // this.getCustomersPage(1);
    this.getCustomersAllCustomers();
  }

  pageChanged(page: number): void {
    // this.getCustomersPage(page);
  }

  getCustomersPage(page: number): void {
    this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
      .subscribe((response: IPagedResults<ICustomer[]>) => {
          this.customers = this.filteredCustomers = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getCustomersPage() retrieved customers for page: ' + page));
  }

  // No paging
  getCustomersAllCustomers(): void {
    this.dataService.getCustomers()
      .subscribe(re => {
          this.customers = this.filteredCustomers = re;
        }, (err: any) => this.logger.log(err),
        () => this.logger.log('getCustomers() retrieved customers'));
  }

  filterChanged(data: string): void {
    if (data && this.customers) {
      data = data.toUpperCase();
      const props = ['firstName', 'lastName', 'city', 'state.name'];
      // this.filteredCustomers = this.filterService.filter<ICustomer>(this.customers, data, props);
    } else {
      this.filteredCustomers = this.customers;
    }
  }
}
