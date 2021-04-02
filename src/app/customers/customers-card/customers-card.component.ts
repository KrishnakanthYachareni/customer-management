import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICustomer} from '../../shared/interfaces';
import {TrackByService} from '../../services/trackby.service';

@Component({
  selector: 'app-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersCardComponent implements OnInit {

  @Input() customers: ICustomer[] = [];

  constructor(public trackbyService: TrackByService) {
  }

  ngOnInit(): void {
  }

}
