import { Component, OnInit, ViewChild } from '@angular/core';
import { Company, Area, Profile, User } from 'src/app/shared/models/models';
import { ClrDatagridSortOrder, ClrWizard } from '@clr/angular';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CompanyService } from '../companies/company.service';
import { AlertsService } from 'src/app/alerts.service';
import { UsersService } from './users.service';
import { ProfilesService } from '../profiles/profile.service';


interface NewUser {
  name: string,
  companies: Company[],
  profile : Profile
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private profileService : ProfilesService,private companyService : CompanyService,private fb : FormBuilder,private alertService : AlertsService, private userService : UsersService) { 
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }

  @ViewChild("wizardlg",{read :"",static: true}) wizardLarge: ClrWizard;
  @ViewChild("wizardlg",{read :"",static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  companies: Company[];
  profiles : Profile[];
  users: User[];

  total: number;
  defaultAttribute;
  defaultAttributeProfile;
  companiesSubject = new Subject<string>();
  profilesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;
  companies$;
  profiles$;


  getCompanies(user : User) : string{
    var aux=[]
    user.companies.forEach((company)=>{
      aux.push(company.name)
    })
    return aux.join(",");
  }
  
  
  resetForm(){
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }
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


    readonly profilesList$ = this.profilesSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(profileName => this.profileService.getProfiles(profileName, 0)
        .pipe(
          map(result => {
            return result[0];
          })
        )
      ));
  
      searchProfile(profileName) {
        if (profileName !== '') {
          this.profilesSubject.next(profileName);
        }
      }


  ngOnInit() {
    this.companies$ = this.companyService.getCompanies(null, 0).pipe(
      map(companies => {
        this.companies = companies[0];
        this.defaultAttribute = this.companies[0];
        this.total = companies[1];
        return companies;
      })
    );
    this.profiles$ = this.profileService.getProfiles(null, 0).pipe(
      map(profiles => {
        this.profiles = profiles[0];
        this.defaultAttributeProfile = this.profiles[0];
        this.total = profiles[1];
        return profiles;
      })
    );
    this.getUsers(null,0);
  }

  addUser({value}: { value: NewUser }) {
    this.userService.addUser(value)
      .subscribe((res) => {
        this.alertService.success("User has been added")
        this.getUsers(null,0);
      },error => {
        this.alertService.error(error.error.message)
      }
      );
  }

  changeUserValues(user) {
    var userToUpdate = this.users.find(this.findUsers, [user.id])
    Object.assign(userToUpdate, user)
  }

  findUsers(u) {
    return u.id == this[0]
  }

  getUsers(filters, offset) {
    this.userService.getUsers(filters, offset)
      .subscribe(
        (users) => {
          this.users = users[0];
          this.total = users[1]
        },
        error => {
          this.alertService.error(error.error.message)
        }
      );
  }

  cleanEmptyFields(filters) {
    console.log(filters)
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
    this.userService.getUsers(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.users = res[0];
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
      profile : ''
    }))
  }
 
  deleteUser = (user: User) => {
    this.userService.deleteUser(user)
      .subscribe((user) => {
        this.alertService.success("User has been deleted")
        this.getUsers(null,0);
      },
      error => {
        this.alertService.error(error.error.message)
      });
  };



}
