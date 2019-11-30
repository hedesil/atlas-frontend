import {Component, OnInit, ViewChild} from '@angular/core';
import {ClrWizard, ClrDatagridSortOrder} from '@clr/angular';
import {Methodology, Functionality, Company} from '../shared/models/models';
import {Subject} from 'rxjs';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {AlertsService} from '../alerts.service';
import {MethodologiesService} from './methodologies.service';
import {CompanyService} from '../administration/companies/company.service';
import {TestsService} from '../tests/tests.service';


@Component({
  selector: 'app-methodologies',
  templateUrl: './methodologies.component.html',
  styleUrls: ['./methodologies.component.scss']
})

export class MethodologiesComponent implements OnInit {

  @ViewChild('wizardlg', {read: '', static: true}) wizardLarge: ClrWizard;
  @ViewChild('wizardlg', {read: '', static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  testVisible: boolean;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  tests = null;
  methodology: Methodology[];
  newMethodology: Methodology = {
    company: undefined,
    description: '',
    name: '',
    tests: []
  };
  isModalVisible = false;
  expanded = new Array(9);
  switches = new Array(58);
  total: number;
  defaultAttribute;
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  newMethodologyVisible: boolean;
  methodologies$;
  methodologiesList;
  testsSubject = new Subject<string>();

  readonly companiesList$ = this.companiesSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(companyName => this.companyService.getCompanies(companyName, 0)
      .pipe(
        map(result => {
          return result[0];
        })
      )
    ));

  readonly testsList$ = this.testsSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(testName => this.testsService.getTests(testName, 0)
      .pipe(
        map(result => {
          return result[0];
        })
      )
    ));

  constructor(private companyService: CompanyService, private fb: FormBuilder,
              private alertService: AlertsService, private testsService: TestsService,
              private methodologiesService: MethodologiesService) {
    this.searchForm = this.fb.group({
      tests: this.fb.array([]),
    });
  }

  closeModal() {
    this.isModalVisible = false;
    this.newMethodology = {company: undefined, description: '', name: '', tests: []};
    this.resetSwitches();
    this.closeStacked();
  }

  resetSwitches() {
    for (let i = 0; i < this.switches.length; i++) {
      this.switches[i] = false;
    }
  }

  closeStacked() {
    for (let i = 0; i < this.expanded.length; i++) {
      this.expanded[i] = false;
    }
  }

  ngOnInit() {
    this.getMethodologies();
  }

  getMethodologies() {
    this.methodologiesService.getMethodologies(null, 0)
      .subscribe(
        result => {
          this.methodologiesList = result[0];
        }
      );
  }

  addMethodology() {
    this.methodologiesService.addMethodology(this.newMethodology)
      .subscribe(
        (res) => {
          this.alertService.success('Methodology has been added');
          this.getMethodologies();
        }, error => {
          this.alertService.error(error.error.message);
        }
      );

  }

  searchCompany(companyName) {
    if (companyName !== '') {
      this.companiesSubject.next(companyName);
    }
  }

  searchTests(testName) {
    if (testName !== '') {
      this.testsSubject.next(testName);
    }
  }

  deleteMethodology = (methodology: Methodology) => {
    this.methodologiesService.deleteMethodology(methodology)
      .subscribe(() => {
          this.alertService.success('Company has been deleted');
          this.getMethodologies();
        },
        error => {
          this.alertService.error(error.error.message);
        });
  };
}
