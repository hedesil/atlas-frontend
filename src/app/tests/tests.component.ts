import {Component, OnInit} from '@angular/core';
import {Company} from '../shared/models/company';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CompanyService} from '../administration/companies/company.service';
import {TestsService} from './tests.service';

export interface Test {
  name: string;
  description: string;
  company: Company;
}

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit {
  isModalVisible: boolean;
  descSort;
  testsList;
  total;
  newTest: Test = {description: '', name: '', company: {}};
  companiesSubject = new Subject<string>();

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

  constructor(private companyService: CompanyService, private testsService: TestsService) {

  }

  ngOnInit() {
    this.getTests();
  }

  searchCompany(companyName) {
    if (companyName !== '') {
      this.companiesSubject.next(companyName);
    }
  }


  getTests() {
    this.testsService.getTests(null, 0)
      .subscribe(
        result => {
          this.testsList = result[0];
        }
      );
  }

  deleteTest(test) {
  }

  closeModal() {
    this.isModalVisible = false;
    this.newTest = {
      name: '',
      description: '',
      company: {}
    };
  }

  addTest() {

  }
}
