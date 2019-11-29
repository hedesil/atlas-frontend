import {Component, OnInit, ViewChild} from '@angular/core';
import {ClrWizard, ClrDatagridSortOrder} from '@clr/angular';
import {Methodology, Functionality} from '../shared/models/models';
import {Subject} from 'rxjs';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {AlertsService} from '../alerts.service';
import {MethodologiesService} from '../methodologies/methodologies.service';
import {CompanyService} from '../administration/companies/company.service';


@Component({
  selector: 'app-methodologies',
  templateUrl: './methodologies.component.html',
  styleUrls: ['./methodologies.component.scss']
})

export class MethodologiesComponent implements OnInit {

  @ViewChild('wizardlg', {read: '', static: true}) wizardLarge: ClrWizard;
  @ViewChild('wizardlg', {read: '', static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  tests = null;
  methodology: Methodology[];
  newMethodology: Methodology = {company: undefined, description: '', id: 0, users: undefined, name: '', functionalities: []};
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


  //constructor() { }

  constructor(private companyService: CompanyService, private fb: FormBuilder, private alertService: AlertsService, private methodologiesService: MethodologiesService) {
    this.searchForm = this.fb.group({
      tests: this.fb.array([]),
    });
  }

  resetForm() {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }

  closeModal() {
    this.isModalVisible = false;
    this.newMethodology = {company: undefined, description: '', id: 0, users: undefined, name: '', functionalities: []};
    this.resetSwitches();
    this.closeStacked();
  }

  resetSwitches() {
    for (var i = 0; i < this.switches.length; i++) {
      this.switches[i] = false;
    }
  }

  closeStacked() {
    for (var i = 0; i < this.expanded.length; i++) {
      this.expanded[i] = false;
    }
  }

  addFunctionality2(functionalityName) {
    this.newMethodology.functionalities.push({name: functionalityName});
  }

  removeFunctionality2(functionalityName) {
    var filtered = this.newMethodology.functionalities.filter(function(value, index, arr) {
      return value.name != functionalityName;
    });
    this.newMethodology.functionalities = filtered;
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

  addTests() {
    var tests = this.searchForm.controls.tests as FormArray;
    tests.push(this.fb.group({
      name: '',
      description: ''
    }));
  }

  test() {
    this.methodologiesService.getMethodologies(this.cleanEmptyFields(this.searchForm.controls.tests.value), 0)
      .subscribe((res) => {
          this.methodology = res[0];
          this.total = res[1];
          this.tests = this.searchForm.controls.tests.value;
        },
        error => {
          this.alertService.error(error.error.message);
        }
      );
  }

  cleanEmptyFields(tests) {
    tests.forEach(test => {
      Object.keys(test).forEach(field => {
        if (test[field].length === 0) {
          delete test[field];
        }
      });
    });
    return tests;
  }

  searchCompany(companyName) {
    if (companyName !== '') {
      this.companiesSubject.next(companyName);
    }
  }

}