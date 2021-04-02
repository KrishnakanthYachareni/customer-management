import {Injectable} from '@angular/core';
import {ICustomer, IOrder} from '../shared/interfaces';


@Injectable()
export class TrackByService {

  customer(index: number, customer: ICustomer): any {
    return customer.id;
  }

  order(index: number, order: IOrder): any {
    return index;
  }
}
