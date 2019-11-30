import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Methodology} from '../../shared/models/methodology';
import {Company} from '../../shared/models/company';
import {MethodologiesService} from '../methodologies.service';
import {AlertsService} from '../../alerts.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-methodology-detail',
  templateUrl: './methodology-detail.component.html',
  styleUrls: ['./methodology-detail.component.scss']
})
export class MethodologyDetailComponent implements OnInit {
  @Input() input: Methodology;
  methodology: Methodology;
  @Output() emit = new EventEmitter<Methodology>();
  methodologyDetail$;

  constructor(private methodologiesService: MethodologiesService, private alertService: AlertsService) {
  }

  ngOnInit() {
    this.methodology = this.input;
    this.methodologyDetail$ = this.methodologiesService.getMethodology(this.methodology);
  }
}
