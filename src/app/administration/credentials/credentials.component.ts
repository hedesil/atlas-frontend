import { Component, OnInit } from '@angular/core';
import { ClrDatagridSortOrder } from '@clr/angular';
import { Company } from '../../shared/models/models';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CompanyService } from '../companies/company.service';
import { AlertsService } from '../../alerts.service';
import { Credential } from '../../shared/models/credential';
import { CredentialsService } from './credentials.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  lgOpen: boolean = false;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  companies: Company[];
  credentials : Credential[]
  total: number;
  defaultAttribute;
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;
  companies$;

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


 
    searchCompany(companyName) {
      if (companyName !== '') {
        this.companiesSubject.next(companyName);
      }
    }
  

  constructor(private companyService : CompanyService,private credentialService: CredentialsService,private fb : FormBuilder,private alertService : AlertsService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }


  resetForm(){
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }

  
  

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies(null, 0).pipe(
      map(companies => {
        this.companies = companies[0];
        this.defaultAttribute = this.companies[0];
        console.log(this.defaultAttribute);
        this.total = companies[1];
        return companies;
      })
    );

    this.getCredentials(null,0);
  }

  addCredential({value}: { value }) {
    this.credentialService.addCredential(value)
      .subscribe((res) => {
        this.alertService.success("Credential has been added")
        this.getCredentials(null,0);
      },error => {
        this.alertService.error(error.error.message)
      }
      );
  }


  changeCredentialValues(credential) {
    var credentialToUpdate = this.credentials.find(this.findCredentials, [credential.id])
    Object.assign(credentialToUpdate, credential)
  }

  findCredentials(c) {
    return c.id == this[0]
  }

  getCredentials(filters,offset) {
    this.credentialService.getCredentials(filters,offset)
      .subscribe((credentials) => {
        this.credentials = credentials[0];
        this.total = credentials[1];
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
    this.credentialService.getCredentials(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.credentials = res[0];
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
    }))
  }

  deleteCredential = (credential: Credential) => {
    this.credentialService.deleteCredential(credential)
      .subscribe((area) => {
        this.alertService.success("Credential has been deleted")
        this.getCredentials(null,0);
      },
      error => {
        console.log(error)
        this.alertService.error(error.error.message)
      });
  };
  
}
