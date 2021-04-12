import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ICustomer, IState} from '../../shared/interfaces';
import {DataService} from '../../services/data.service';
import {LoggerService} from '../../services/logger.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  showForm: boolean;
  customer: ICustomer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      }
    };
  states: IState[] = [];
  errorMessage: any;
  deleteMessageEnabled = false;
  operationText = 'Insert';
  // @ts-ignore
  @ViewChild('customerForm') customerForm: NgForm;

  @Output() addEvt = new EventEmitter();

  toggleAptDisplay(): void {
    this.showForm = !this.showForm;
  }

  constructor(private dataService: DataService, private logger: LoggerService,
              private router: Router,
              private route: ActivatedRoute) {
    this.showForm = true;
  }

  ngOnInit(): void {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // @ts-ignore
    this.route.parent.params.subscribe(() => {
      const id: number = Number(this.route.snapshot.paramMap.get('id'));
      if (id !== 0) {
        this.operationText = 'Update';
        this.showForm = !this.showForm;
        this.getCustomer(id);
      }
    });
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  getCustomer(id: number): void {
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  submit(): void {
    if (this.customer.id === 0) {
      console.log('inside submit if');
      this.dataService.insertCustomer(this.customer)
        .subscribe((insertedCustomer: ICustomer) => {
            if (insertedCustomer) {
              this.customerForm.form.markAsPristine();
              this.router.navigate(['/customers']);
              this.errorMessage = 'Successfully Added the customer';
            } else {
              this.errorMessage = 'Unable to insert customer';
            }
          },
          (err: any) => this.logger.log(err));
    } else {
      console.log('inside submit else');
      this.dataService.updateCustomer(this.customer)
        .subscribe((status: boolean) => {
            if (status) {
              this.customerForm.form.markAsPristine();
            } else {
              this.errorMessage = 'Unable to update customer';
            }
          },
          (err: any) => this.logger.log(err));
    }
  }

  cancel(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/customers']);
  }

  delete(event: Event): void {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer.id)
      .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/customers']);
          } else {
            this.errorMessage = 'Unable to delete customer';
          }
        },
        (err) => this.logger.log(err));
  }

}
