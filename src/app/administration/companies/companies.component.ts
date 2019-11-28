import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company';
import { CompanyService } from './company.service';
import { Observable, Subject, from, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { ClrDatagridStateInterface, ClrDatagridSortOrder } from '@clr/angular';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AlertsService } from 'src/app/alerts.service';


interface NewCompany {
  name: string,
  description: string
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  descSort = ClrDatagridSortOrder.DESC;
  isModalVisible: boolean;
  filters = null;
  companies: Company[];
  total: number;
  defaultAttribute;
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;

 /* readonly companiesList$ = this.companiesSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(companyName => this.companyService.getCompanies(companyName, 0)
      .pipe(
        map(result => {
          return result[0];
        })
      )
    ));*/

  constructor(private companyService: CompanyService, private fb: FormBuilder, private alertService: AlertsService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }

  searchCompany(companyName) {
    if (companyName !== '') {
      this.companiesSubject.next(companyName);
    }
  }

  ngOnInit() {
    this.getCompanies(null,0)
  }

  addCompany({ value }: { value: NewCompany }) {
    this.companyService.addCompany(value)
      .subscribe(
        res => {
          this.alertService.success("Company has been added")
          this.getCompanies(null, 0);
        },
        error => {
          this.alertService.error(error.error.message)
        }
      );
  }


  changeCompanyValues(company) {
    var companyToUpdate = this.companies.find(this.findCompanies, [company.id])
    Object.assign(companyToUpdate, company)
  }

  findCompanies(c) {
    return c.id == this[0]
  }

  getCompanies(filters, offset) {
    this.companyService.getCompanies(filters, offset)
      .subscribe(
        (companies) => {
          this.companies = companies[0];
          this.total = companies[1]
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
    this.companyService.getCompanies(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.companies = res[0];
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
      description: ''
    }))
  }

  refresh(state: ClrDatagridStateInterface) {
    /*    console.log(state)
        console.log(state.page.size*state.page.from)
        this.getCompanies(null,state.page.size*state.page.from)*/
  }

  deleteCompany = (company: Company) => {
    this.companyService.deleteCompany(company)
      .subscribe((company) => {
        this.alertService.success("Company has been deleted")
        this.getCompanies(null, 0);
      },
        error => {
          this.alertService.error(error.error.message)
        });
  };
}
