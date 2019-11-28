import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from '../../../shared/models/company';
import { AlertsService } from 'src/app/alerts.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  @Input() input: Company;
  company: Company;
  @Output() emit = new EventEmitter<Company>();


  constructor(private companyService: CompanyService,private alertService : AlertsService) {
  }

  ngOnInit() {
    this.company = this.input;
    this.getCompanyDetails(this.company);

  }

  getCompanyDetails = (company: Company) => {
    this.companyService.getCompany(company)
      .subscribe((company) => {
        this.company = company;
      },
      error => {
        this.alertService.error(error.error.message)
      });
  };

  modifyCompany() {
    this.companyService.modifyCompany(this.company)
      .subscribe((res) => {
        this.alertService.success("Company has been modified")
        this.company = res;
        this.emit.emit(this.company)
      },
      error => {
        this.alertService.error(error.error.message)
      });
  }


}
