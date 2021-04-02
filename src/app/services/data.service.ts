import {Injectable} from '@angular/core';
import {IApiResponse, ICustomer, IOrder, IPagedResults, IState} from '../shared/interfaces';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  private customerBaseURL = '/api/customers';
  private orderBaseURL = '/api/orders';
  orders: IOrder[] = [];
  states: IState[] = [];

  private static handleError(error: HttpErrorResponse): Observable<any> {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

  getCustomersPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
    return this.http.get<ICustomer[]>(
      `${this.customerBaseURL}/page/${page}/${pageSize}`,
      {observe: 'response'})
      .pipe(
        map(res => {
          // @ts-ignore
          const totalRecords = +res.headers.get('X-InlineCount');
          const customers = res.body as ICustomer[];
          this.calculateCustomersOrderTotal(customers);
          return {
            results: customers,
            totalRecords
          };
        }),
        catchError(DataService.handleError)
      );
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customerBaseURL)
      .pipe(
        map(customers => {
          this.calculateCustomersOrderTotal(customers);
          return customers;
        }),
        catchError(DataService.handleError)
      );
  }

  getCustomer(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.customerBaseURL + '/' + id)
      .pipe(
        map(customer => {
          this.calculateCustomersOrderTotal([customer]);
          return customer;
        }),
        catchError(DataService.handleError)
      );
  }

  insertCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.customerBaseURL, customer)
      .pipe(catchError(DataService.handleError));
  }

  updateCustomer(customer: ICustomer): Observable<boolean> {
    return this.http.put<IApiResponse>(this.customerBaseURL + '/' + customer.id, customer)
      .pipe(
        map(res => res.status),
        catchError(DataService.handleError)
      );
  }

  deleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<IApiResponse>(this.customerBaseURL + '/' + id)
      .pipe(
        map(res => res.status),
        catchError(DataService.handleError)
      );
  }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>('/api/states')
      .pipe(catchError(DataService.handleError));
  }

  calculateCustomersOrderTotal(customers: ICustomer[]): void {
    for (const customer of customers) {
      if (customer && customer.orders) {
        let total = 0;
        for (const order of customer.orders) {
          total += order.itemCost;
        }
        customer.orderTotal = total;
      }
    }
  }
}
