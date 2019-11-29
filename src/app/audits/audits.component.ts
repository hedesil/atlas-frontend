import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ClrDatagridSortOrder, ClrWizard } from '@clr/angular';
import { AlertsService } from '../alerts.service';
import { Audit } from '../shared/models/audit';
import { AuditService } from './audits.service';
import { AppConstants } from '../shared/constants/constants';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {

  @ViewChild("wizardlg",{read :"",static: true}) wizardLarge: ClrWizard;
  lgOpen : boolean = false;
  

  audits: Audit[];
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;
  descSort = ClrDatagridSortOrder.DESC;
  isModalVisible: boolean;
  filters = null;
  expanded = new Array(9);
  total: number;
  areasSubject = new Subject<string>();
  defaultAttributeArea;
  defaultAttributeCompany;
  companies$;



  private readonly _pentestTools;





  constructor(  private fb: FormBuilder, private alertService: AlertsService, private auditService: AuditService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
    this._pentestTools = AppConstants.pentestTools

  }

  ngOnInit() {
    this.getAudits(null, 0)
  }

  closeModal() {
    this.isModalVisible = false
    this.closeStacked()
  }
  closeStacked() {
    for (var i = 0; i < this.expanded.length; i++) {
      this.expanded[i] = false
    }
  }

  getNVulns(audit: Audit, risk){
    return 0;
  }

  changeAuditValues(audit) {
    var auditToUpdate = this.audits.find(this.findAudits, [audit.id])
    Object.assign(auditToUpdate, audit)
  }

  findAudits(a) {
    return a.id == this[0]
  }


  getAudits(filters, offset) {
    this.auditService.getAudits(filters, offset)
      .subscribe(
        (audits) => {
          this.audits = audits[0];
          this.total = audits[1]
        },
        error => {
          this.alertService.error(error.error.message)
        }
      );
  }

  cleanEmptyFields(filters) {
    filters.forEach(filter => {
      Object.keys(filter).forEach(field => {
        if (filter[field].length === 0) {
          delete filter[field]
        }
      })
    });
    return filters
  }

  filter() {
    this.auditService.getAudits(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.audits = res[0];
        this.total = res[1];
        this.filters = this.searchForm.controls.filters.value
      },
        error => {
          this.alertService.error(error.error.message)
        }
      );
  }

  addFilters() {
    var filters = this.searchForm.controls.filters as FormArray
    filters.push(this.fb.group({
      enviroment: '',
      name: '',
      port: ''
    }))
  }

  deleteAudit = (audit: Audit) => {
    this.auditService.deleteAudit(audit)
      .subscribe((audit) => {
        this.alertService.success("Audit has been deleted")
        this.getAudits(null, 0);
      },
        error => {
          this.alertService.error(error.error.message)
        });
  };

}
