import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../companies/company.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Company } from '../../shared/models/models';
import { AlertsService } from '../../alerts.service';
import { Credential } from '../../shared/models/credential';
import { CredentialsService } from './credentials.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  searchForm: FormGroup;
  defaultAttribute;
  companies: Company[];
  credentials : Credential[] 
  filters = null
  companies$;
  companiesSubject = new Subject<string>();
  total: number;
 
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

  constructor(private fb : FormBuilder,private companyService : CompanyService,private credentialService : CredentialsService, private alertService : AlertsService) { 
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
    this.credentialService.getCredential(this.cleanEmptyFields(this.searchForm.controls.filters.value))
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
      company : '',
    }))
  }

  deleteCredential = (credential: Credential) => {
    this.credentialService.deleteCredential(credential)
      .subscribe((credential) => {
        this.alertService.success("Credential has been deleted")
        this.getCredentials(null,0);
      },
      error => {
        console.log(error)
        this.alertService.error(error.error.message)
      });
  };

}
