import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Methodology} from '../../shared/models/methodology';
import {Company} from '../../shared/models/company';
import {MethodologiesService} from '../methodologies.service';
import {AlertsService} from '../../alerts.service';
import {Observable} from 'rxjs';
import {Test} from '../../tests/tests.component';

@Component({
  selector: 'app-methodology-detail',
  templateUrl: './methodology-detail.component.html',
  styleUrls: ['./methodology-detail.component.scss']
})
export class MethodologyDetailComponent implements OnInit {
  @Input() input: Test[];
  @Output() emit = new EventEmitter<Methodology>();

  constructor(private methodologiesService: MethodologiesService, private alertService: AlertsService) {
  }

  ngOnInit() {
  }
}
