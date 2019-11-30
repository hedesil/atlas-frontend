import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrDatagridSortOrder } from '@clr/angular';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Vulnerability, Audit } from '../shared/models/models';
import { AlertsService } from '../alerts.service';
import { VulnerabilitiesService } from './vulnerabilities.service';
import { AuditService } from '../audits/audits.service';


@Component({
  selector: 'app-vulnerabilities',
  templateUrl: './vulnerabilities.component.html',
  styleUrls: ['./vulnerabilities.component.scss']
})
export class VulnerabilitiesComponent implements OnInit {

  @ViewChild("wizardlg",{read :"",static: true}) wizardLarge: ClrWizard;
  @ViewChild("wizardlg",{read :"",static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  vulnerabilities: Vulnerability[];
  newVulnerability : Vulnerability = { name : '', description: '', risk: 0, executedTest: '',solution: '', content: ''};
  isModalVisible = false
  audits : Audit[]
  total: number;
  defaultAttribute;
  auditsSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;

  audits$;



  readonly auditsList$ = this.auditsSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(auditName => this.auditService.getAudits(auditName,0)
      .pipe(
        map(result => {
          return result[0]
        })
      )
  ))

  searchAudit(auditName) {
    if (auditName !== '') {
      this.auditsSubject.next(auditName);
    }
  }


  constructor(private fb : FormBuilder,private alertService : AlertsService, private vulnerabilityService : VulnerabilitiesService, private auditService: AuditService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }


  resetForm(){
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }


  closeModal(){
    this.isModalVisible = false
    this.newVulnerability = { name : ''}
  }
  


  ngOnInit() {
  this.audits$ = this.auditService.getAudits(null, 0).pipe(
      map(audits => {
        this.audits = audits[0];
        this.defaultAttribute = this.audits[0];
        this.total = audits[1];
        return audits;
      })
    );
    this.getVulnerabilities(null,0);

  }

  addVulnerability() {
    this.vulnerabilityService.addVulnerability(this.newVulnerability)
      .subscribe((res) => {
        this.alertService.success("Vulnerability has been added")
        this.getVulnerabilities(null,0);
      },error => {
        this.alertService.error(error.error.message)
      }
      );
  }


  changeVulnerabilityValues(vulnerability) {
    var vulnerabilityToUpdate = this.vulnerabilities.find(this.findVulnerabilities, [vulnerability.id])
    Object.assign(vulnerabilityToUpdate, vulnerability)
  }

  findVulnerabilities(v) {
    return v.id == this[0]
  }

  getVulnerabilities(filters,offset) {
    this.vulnerabilityService.getVulnerabilities(filters,offset)
      .subscribe((vulnerabilities) => {
        this.vulnerabilities = vulnerabilities[0];
        this.total = vulnerabilities[1];
      },
      error => {
        this.alertService.error(error.error.message)
      });
  }

  cleanEmptyFields(filters) {
    filters.forEach(filter => {
      Object.keys(filter).forEach(field => {
        if (!filter[field]) {
          delete filter[field]
        }
      })
    });
    return filters
  }

  filter() {
    this.vulnerabilityService.getVulnerabilities(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.vulnerabilities = res[0];
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
      name: '',
      company : '',
    }))
  }

  deleteVulnerability = (vulnerability: Vulnerability) => {
    this.vulnerabilityService.deleteVulnerability(vulnerability)
      .subscribe((vulnerability) => {
        this.alertService.success("Vulnerability has been deleted")
        this.getVulnerabilities(null,0);
      },
      error => {
        console.log(error)
        this.alertService.error(error.error.message)
      });
  };

}
