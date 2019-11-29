import { Component, OnInit } from '@angular/core';
import { AuditService } from './audit.service';
import { Audit } from '../shared/models/models';
import { AlertsService } from '../alerts.service';
import { AppConstants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  audits: Audit[];
  newAudit: Audit;
  isModalVisible: boolean;
  expanded = new Array(9);


  constructor() { }

  ngOnInit() {
  }


  closeModal() {
    this.isModalVisible = false
    this.newAudit = { name: '' }
    this.closeStacked()
  }
 closeStacked() {
    for (var i = 0; i < this.expanded.length; i++) {
      this.expanded[i] = false
    }
}
}
